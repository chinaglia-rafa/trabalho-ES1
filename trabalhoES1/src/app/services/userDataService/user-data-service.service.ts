import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {

  private userData: any = {};
  private userReports : any = [];
  /** Emite dados para subscribes desta variável com os dados de usuário */
  public userDataObservable = new BehaviorSubject({});


  constructor(
    private db: AngularFirestore,
    private router: Router,
  ) {
    this.init();
  }

  async setUserData(data : any){

    let responseClient : any = await this.getUserDataFromDB(data);
    let responseLeader : any = {}, finalResult : any = {};
    let responseReports : any = {}, innerStudentResponse : any = {};

    console.log("data set userdata: ",data);

    console.log("responseClient: ",responseClient)
    if(true)
    {
      if(responseClient.type == "aluno")
      {
        responseLeader = await this.getLeaderDataFromDB(responseClient.leaderID);
        responseReports = await this.getReportsFromDB(data.user.uid);

        finalResult = {...responseClient, "leader" : responseLeader, "reports" : responseReports};
      }
      else{

        responseReports = this.getReportsFromDBLeaderVersion(data.user.uid);
        let carretinha : any = [];
        let newReports : any = [];
        responseReports.then((elem: any) =>{
          console.log("elem: ", elem);
          elem.map((item : any) =>{
            let dummyData : any = {"data" : {}, "user" : {"name" : "dummy", "uid" : item.studentOwnerCode}};
            
            
            innerStudentResponse =  this.getUserDataFromDB(dummyData);
            carretinha.push(innerStudentResponse);
            innerStudentResponse.then((i:any) => {
              console.log("i: ", i);
              if(i != null)
              {
                newReports.push( {...item, "student" : i})
              }
              else{
                newReports.push(item);
              }
              
            })
          })
          Promise.all(carretinha).then((e) =>{
            finalResult = {...responseClient, "reports" : newReports};
            console.log("finalResult: ",finalResult);
          })
          
        })
        
        
        
      }

    }


    
    console.log("finalResult: ",finalResult);

    localStorage.setItem('user', btoa(JSON.stringify(data)));

    this.userData = finalResult;
  }
  async getUserDataFromDB(data: any){
    const response =  (await this.db.firestore.collection("userData").doc(data.user.uid).get()).data();

    return response;
  }

  async getReportsFromDB(userID : string)
  {
    let dataResponse: any = [];
    //console.log("user ID: ",userID);
    let response = await this.db.collection("reports",  ref => ref.where('studentOwnerCode', '==', userID)).valueChanges().subscribe(data => {
      data.map((item, index) =>{
        dataResponse[index] = data[index];
      })
    })
    return dataResponse;
  }
  getReportsFromDBLeaderVersion(userID : string)
  {
    return new Promise((resolve, reject) => {
      let dataResponse: any = [];
      //console.log("user ID: ",userID);
      let response = this.db.collection("reports",  ref => ref.where('leaderCode', '==', userID)).valueChanges().subscribe(data => {
        data.map((item, index) =>{
          dataResponse[index] = data[index];
        })
        resolve(dataResponse);
      })
      
    })
    
  }
  async getLeaderDataFromDB(leaderID : string)
  {
    const response =  (await this.db.firestore.collection("userData").doc(leaderID).get()).data();

    return response;
  }
  getUserData(){
    return this.userData;
  }

  isAlreadyLogged(){
    if(localStorage.getItem('user') != null){
      console.log("local storage: ", localStorage.getItem('user'))
      return true
    }
    else{
      return false;
    }
  }

  getLocalStorageUser() : any{
    const item : any = localStorage.getItem('user');
    return (JSON.parse(atob(item)));
  }

  init() {
    if(this.isAlreadyLogged()) {
      const user = this.getLocalStorageUser();
      console.log("Local storage converted: ", user);
      this.setUserData(user);
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
declare var require: any
@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {

  private userData: any = {};
  private userUID: any ={};
  private userReports : any = [];
  /** Emite dados para subscribes desta variável com os dados de usuário */
  public userDataObservable = new BehaviorSubject({});

  private keygen = require("keygenerator");


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
    if(true) // refatorar
    {
      if(responseClient.type == "aluno")
      {
        responseLeader = await this.getLeaderDataFromDB(responseClient.leaderID);
        responseReports = await this.getReportsFromDB(data.user.uid);

        finalResult = {...responseClient, "leader" : responseLeader, "reports" : responseReports};
      }
      else if (responseClient.type == "leader"){

        responseReports = this.getReportsFromDBLeaderVersion(data.user.uid);
        let carretinha : any = [];
        let newReports : any = [];
        responseReports.then((elem: any) =>{
          console.log("elem: ", elem);
          elem.map((item : any) =>{
            let dummyData : any = {"data" : {}, "user" : {"name" : "dummy", "uid" : item.studentOwnerCode}};

            innerStudentResponse =  this.getUserDataFromDB(dummyData, true);
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
            finalResult = {...responseClient, "leader": responseClient, "reports" : newReports};
            console.log("finalResultLEADER: ",finalResult);
            this.userDataObservable.next(finalResult);
            this.userData = finalResult;
          })
        })
      }
    }

    console.log("finalResult: ",finalResult);

    localStorage.setItem('user', btoa(JSON.stringify(data)));

    this.userDataObservable.next(finalResult);
    this.userData = finalResult;
  }
  getUserUID(){
    return this.userUID;
  }
  async getUserDataFromDB(data: any, skipUID: boolean = false){
    const response =  (await this.db.firestore.collection("userData").doc(data.user.uid).get()).data();
    console.log('this.userUID', data.user);
    if (!skipUID) this.userUID = data.user.uid;
    return response;
  }
  setNewReport(data : any){

    const key = this.keygen.session_id();

    data.uid = key;

    this.db.collection("reports").doc(key).set(data).then((e) => {
      console.log("deu certo", e);
    }).catch((res) => {
      console.log("res: ", res)
    })
  }
  async getReportsFromDB(userID : string)
  {
    let dataResponse: any = [];
    //console.log("user ID: ",userID);
    let response = await this.db.collection("reports",  ref => ref.where('studentOwnerCode', '==', userID)).valueChanges().subscribe(data => {
      data.map((item, index) =>{
        dataResponse[index] = data[index];
        console.log("reports data: ",item);
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

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {

  private userData: any = {};
  private userReports : any = [];
  

  constructor(private db: AngularFirestore) {
    
  }

  async setUserData(data : any){
    
    let responseClient : any = await this.getUserDataFromDB(data);
    let responseLeader : any = {}, finalResult : any = {};
    let responseReports : any = {}, innerStudentResponse : any = {};

    //console.log("data set userdata: ",data);

    // console.log("responseClient: ",responseClient)
    if(responseClient != null)
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
    
    // console.log("leader: ", responseClient.leader.data())
    

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
}

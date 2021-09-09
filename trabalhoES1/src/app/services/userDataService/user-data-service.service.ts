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

        responseReports =  this.getReportsFromDBLeaderVersion(data.user.uid);

        // responseReports.then((item: any) =>{
        //   console.log("item: ", item);
        // })
        
        if(responseReports != null){
          console.log("entrou no if: ", responseReports);

          
          responseReports.map((item : any) =>{
            let dummyData : any = {"data" : {}, "user" : {"name" : "dummy", "uid" : item.studentOwnerCode}};
            innerStudentResponse =  this.getUserDataFromDB(dummyData);
            console.log("entrou no map")
            if(innerStudentResponse != null)
            {
              item = {...item, "student" : innerStudentResponse}
            }
            else{
              // console.log("caiu no else")
              item = item;
            }
            
          })

          // responseReports.then((item : any) => {
          //   console.log("item: ", item);
          // })
          // console.log("response reports: ",responseReports);
        }
        finalResult = {...responseClient, "reports" : {responseReports}};
      }
      
    }
    
    // console.log("leader: ", responseClient.leader.data())
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
    let dataResponse: any = [];
    //console.log("user ID: ",userID);
    let response = this.db.collection("reports",  ref => ref.where('leaderCode', '==', userID)).valueChanges().subscribe(data => {
      data.map((item, index) =>{
        dataResponse[index] = data[index];
      })
    })
    return dataResponse;
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

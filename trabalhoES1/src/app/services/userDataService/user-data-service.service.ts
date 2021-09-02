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
    let responseReports : any = {};

    console.log("data set userdata: ",data);

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
        finalResult = responseLeader;
      }
      
    }
    
    // console.log("leader: ", responseClient.leader.data())
    console.log("finalResult: ",finalResult)
    this.userData = finalResult;
  }
  async getUserDataFromDB(data: any){
    const response =  (await this.db.firestore.collection("userData").doc(data.user.uid).get()).data();
    
    return response;
  }

  async getReportsFromDB(userID : string)
  {
    let dataResponse: any = [];
    
    let response = this.db.collection("reports").valueChanges().subscribe(data => {
      data.map((item, index) =>{
        dataResponse[index] = data[index];
      })
    })
    // .subscribe((val) => {

    //   return val;
    // })
    
    
    // if(response != undefined)
    // {
    //   console.log("response reports: ",response);
    // }
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

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {

  private userData: any = {};
  

  constructor(private db: AngularFirestore) {
    
  }

  async setUserData(data : any){
    
    let responseClient : any = await this.getUserDataFromDB(data);
    let responseLeader : any = {}, finalResult : any = {};


    // console.log("responseClient: ",responseClient)
    if(responseClient != null)
    {
      if(responseClient.type == "aluno")
      {
        responseLeader = await this.getLeaderDataFromDB(responseClient.leaderID);

        finalResult = {...responseClient, "leader" : responseLeader};
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


  async getLeaderDataFromDB(leaderID : string)
  {
    const response =  (await this.db.firestore.collection("userData").doc(leaderID).get()).data();
    
    return response;
  }
  getUserData(){
    return this.userData;
  }
}

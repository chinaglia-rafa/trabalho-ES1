import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {

  private userData: object = {};
  

  constructor(private db: AngularFirestore) {
    
  }

  async setUserData(data : any){
    
    const response = await this.getUserDataFromDB(data);

    console.log("response: ",response)
    // console.log("leader: ", response.leader.data())

    this.userData = data;
  }
  async getUserDataFromDB(data: any){
    const response = await (await this.db.firestore.collection("userData").doc(data.user.uid).get()).data();
    
    return response;
  }
  getUserData(){
    return this.userData;
  }
}

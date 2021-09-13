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
    console.log("finalResult: ",finalResult);
    this.userDataObservable.next(finalResult);

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
    console.log("user ID: ",userID);
    let response = await this.db.collection("reports",  ref => ref.where('studentOwnerCode', '==', userID)).valueChanges().subscribe(data => {
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

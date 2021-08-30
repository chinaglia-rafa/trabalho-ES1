import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {

  private userData: object = {};


  constructor() {
    
  }

  setUserData(data : object){
    this.userData = data; 
  }

  getUserData(){
    return this.userData;
  }
}

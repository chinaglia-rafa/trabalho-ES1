import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserDataServiceService } from 'src/app/services/userDataService/user-data-service.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService,
      public router: Router,  
      private userDataService : UserDataServiceService
    ) {
      
   }
  isAlreadyLogged(){
    if(localStorage.getItem('user') != null){
      //console.log("local storage: ", localStorage.getItem('user'))
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
  ngOnInit(): void {
    if(this.isAlreadyLogged())
    {
      

      const user = this.getLocalStorageUser();
      //console.log("Local storage converted: ", user);
      this.userDataService.setUserData(user);

      // console.log("get user reports: ",this.getUserReports());
    }
    else{
      this.router.navigateByUrl('/login');
    }
    //console.log("UsuarioLogado: ", this.userDataService.getUserData());
  }
  getUserReports(){
    
    const user : any = this.userDataService.getUserData();

    return user.reports;
  }
  getUserData(){
    const userData = this.userDataService.getUserData();



    return userData;
  }

  login(): void {
    //console.log('login begins');
  }

}

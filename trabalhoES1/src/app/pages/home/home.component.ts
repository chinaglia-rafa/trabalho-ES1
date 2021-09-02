import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserDataServiceService } from 'src/app/services/userDataService/user-data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService,
      private userDataService : UserDataServiceService
    ) {
      
   }

  ngOnInit(): void {
    //console.log("UsuarioLogado: ", this.userDataService.getUserData());
  }
  getUserReports(){
    

  }
  getUserData(){
    const userData = this.userDataService.getUserData();



    return userData;
  }

  login(): void {
    console.log('login begins');
  }

}

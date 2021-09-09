import { Component, OnInit } from '@angular/core';
import { UserDataServiceService } from 'src/app/services/userDataService/user-data-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private userData: UserDataServiceService) { }

  ngOnInit(): void {
    console.log('this.userData.getUserData() =', this.userData.getUserData());
  }

}

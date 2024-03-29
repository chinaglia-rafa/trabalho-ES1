import { Component, OnInit } from '@angular/core';
import { UserDataServiceService } from 'src/app/services/userDataService/user-data-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public reports: any = [];
  public isLeader: boolean = false;

  constructor(private userDataService: UserDataServiceService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.userDataService.userDataObservable.subscribe((data: any) => {
      this.isLeader = data.type == 'leader' || data.type == 'CCP';
      console.log('List of reports:', data.reports);
      this.reports = data.reports;
    });
  }

}

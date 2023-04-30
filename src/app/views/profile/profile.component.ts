import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  id = '';
  AllData: any;
  messageSuccess = '';
  dataArray: any = [];
  messageErr = '';

  databyid: any;

  constructor(
    private dataService: ServicesService,
    private route: Router,
    private http: HttpClient,
    private Route: ActivatedRoute
  ) {
    
  }
  ngOnInit() {
    this.Route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getbyid(this.id)
  }
  getbyid(id: any) {
    this.dataService
    .getonestudent(id, 'candidate/getdetails/')
    .subscribe((data) => {
      console.log("/////details/////",data);
      this.databyid = data;
    });
  }
}
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { AuthService } from '../services/auth.service';

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
editable=false
  databyid: any;

  constructor(
    private asd:AuthService,

    private dataService: ServicesService,
    private route: Router,
    private http: HttpClient,
    private Route: ActivatedRoute
  ) {
    if(this.asd.LoggedIn()==true){
      this.editable=true;
  }
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
  UpdateCandidateProfile(f:any){
    let data = f.value
    this.dataService
    .updateStudent(this.databyid._id,data, 'candidate/update/')
    .subscribe((data) => {
      console.log("/////details/////",data);
      this.databyid = data;
    });
  }
}

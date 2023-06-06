import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-suprivisor-profile',
  templateUrl: './suprivisor-profile.component.html',
  styleUrls: ['./suprivisor-profile.component.css']
})
export class SuprivisorProfileComponent {
  id = '';
  AllData: any;
  messageSuccess = '';
  dataArray: any = [];
  messageErr = '';
  editable=false;
  bars = [
    { name: 'Web Design', value: 80 },
    { name: 'Website Markup', value: 72 },
    { name: 'One Page', value: 89 },
    { name: 'Mobile Template', value: 55 },
    { name: 'Backend API', value: 66 },
  ];
  databyid: any;
  constructor(
    private asd:AuthService,
    private dataService: ServicesService,
    private route: Router,
    private http: HttpClient,
    private Route: ActivatedRoute
  ) {
    console.log("Login check",this.asd.MentorLoggedIn())
    if(this.asd.MentorLoggedIn()==true){
      this.editable=true;
  }
  }
  ngOnInit() {
    this.Route.params.subscribe(params => {
      this.id = params['id'];
    });
    console.log("the id :",this.id)
    this.getbyid(this.id)
  }
  getbyid(id: any) {
    this.dataService
    .getonestudent(id, 'suprivisor/getbyid/')
    .subscribe((data) => {
      console.log("/////details/////",data);
      this.databyid = data;
    });
  }
  updateSuprivisorProfile(f:any,id:any){
    const data=f.value;
    console.log("/////data/////",data);
    console.log("/////id/////",id);

    this.dataService.updateStudent(id,data,'suprivisor/update/').subscribe((res) => {
      console.log("/////details/////",res);
      this.databyid = res;
    });
  }

}

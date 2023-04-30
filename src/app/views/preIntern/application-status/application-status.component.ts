import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, switchMap, catchError, of } from 'rxjs';
import { ServicesService } from '../../services/services.service';
import jwt_decode from 'jwt-decode';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-application-status',
  templateUrl: './application-status.component.html',
  styleUrls: ['./application-status.component.css']
})
export class ApplicationStatusComponent {
  id = '';
  AllData: any;
  messageSuccess = '';
  dataArray: any = [];
  messageErr = '';
  decodedToken: any 
  databyid: any;

  constructor(
    private dataService: ServicesService,
    private asd :AuthService,
    private route: Router,
    private http: HttpClient,
    private Route: ActivatedRoute
  ) {
    if(this.asd.LoggedIn()==false){
      this.route.navigate(['/auth/login'])
    }
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.decodedToken= jwt_decode(token);
      // rest of your code here
    }
    this.id=this.decodedToken._id

    this.getbyid(this.id);
    console.log(this.asd.LoggedIn())
   
 
  }


  getbyid(id: any) {
    console.log(this.route)
    this.dataService
      .getappbyid('appstatus/getbyid/',id )
      .subscribe((data) => {
        console.log(data);
        this.AllData = data;
      });
  }

}

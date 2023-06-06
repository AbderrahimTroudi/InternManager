import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/views/services/auth.service';
import { ServicesService } from 'src/app/views/services/services.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-suprivisor-layout',
  templateUrl: './suprivisor-layout.component.html',
  styleUrls: ['./suprivisor-layout.component.css']
})
export class SuprivisorLayoutComponent {
  loggedIn = false;
  decodedToken:any
  id=''
  constructor(private service:ServicesService,private asd:AuthService,private route:Router,private arouter:ActivatedRoute) {
    console.log("Login check",this.asd.MentorLoggedIn())
    if(this.asd.MentorLoggedIn()==true){
      this.loggedIn=true;
  }
  else{
    this.route.navigate(['/adminlogin'])

  }


    const token = localStorage.getItem('token');
    if (token !== null) {
      this.decodedToken= jwt_decode(token);
      this.id=this.decodedToken._id
    }
    if(this.asd.MentorLoggedIn()==true){

    }
  else{
    this.route.navigate(['/auth/login'])

  }
   }
   logout(){
    localStorage.removeItem('token');
    this.route.navigate(['adminlogin'])
   }
  nav(route:any){
    this.route.navigate([route])
  }
  navProfile(){
    
    this.route.navigate(['suprivisor/profile',this.id])
  }
  navProgress(){
  
    this.route.navigate(['/suprivisor/internsprogress/',this.id])

  }
  navMeetRequest(){
    this.route.navigate(['/suprivisor/meetrequest/',this.id])

  }
}

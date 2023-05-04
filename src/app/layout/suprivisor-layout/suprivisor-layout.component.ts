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
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.decodedToken= jwt_decode(token);
      this.id=this.decodedToken._id
    }
    if(this.asd.MentorLoggedIn()==true){
      this.route.navigate(['/suprivisor/internprogress/',this.id])
    }
  else{
    this.route.navigate(['/auth/login'])

  }
  
   }
   logout(){
    localStorage.removeItem('token');
    this.route.navigate(['auth/login'])

   }
  nav(route:any){
    this.route.navigate([route])
  }
  navProfile(){
    
    this.route.navigate(['landingpage/profile',this.id])
  }
  navProgress(){
    
    this.route.navigate(['landingpage/progress',this.id])
  }
}

import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminAuthService } from 'src/app/views/services/admin-auth.service';
import { AuthService } from 'src/app/views/services/auth.service';
import { ServicesService } from 'src/app/views/services/services.service';
import jwt_decode from 'jwt-decode';



@Component({
  selector: 'app-landingpage-layout',
  templateUrl: './landingpage-layout.component.html',
  styleUrls: ['./landingpage-layout.component.css']
})
export class LandingpageLayoutComponent {
  loggedIn = false;
  decodedToken:any
  id=''
  constructor(private service:ServicesService,private asd:AuthService,private route:Router,private arouter:ActivatedRoute) {
    if(this.asd.LoggedIn()==true){
      this.loggedIn=true;
  }
  const token = localStorage.getItem('token');
    if (token !== null) {
      this.decodedToken= jwt_decode(token);
      this.id=this.decodedToken._id
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


  cardVisible: boolean = false;

  toggleCard() {
    this.cardVisible = !this.cardVisible;
  }
  progressDescription="";
  progressTitle="";

  addProgress() {
    const newProgress = {
      title: this.progressTitle,
      description: this.progressDescription,
    };
    console.log('New progress:', newProgress);
    this.service.addProgress("candidate/addprogress/", newProgress, this.id).subscribe(data => console.log("success", data));
    // Reset the input field
    this.progressDescription="";
    this.progressTitle="";

  }
  

}

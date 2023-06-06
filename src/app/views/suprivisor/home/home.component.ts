import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','./s.scss']
})
export class HomeComponent {
count =["1","2","2"]
id:any
decodedToken:any
constructor(private route:Router) {
  
  const token = localStorage.getItem('token');
  if (token !== null) {
    this.decodedToken= jwt_decode(token);
    this.id=this.decodedToken._id
  }
}
navAddInternship(){
    
  this.route.navigate(['suprivisor/addinternship/',this.id])
}
navProgress(){

  this.route.navigate(['/suprivisor/internsprogress/',this.id])

}
navMeetRequest(){
  this.route.navigate(['/suprivisor/meetrequest/',this.id])

}
}

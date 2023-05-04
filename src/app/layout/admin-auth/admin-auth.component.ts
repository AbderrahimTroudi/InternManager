import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminAuthService } from 'src/app/views/services/admin-auth.service';
import { AuthService } from 'src/app/views/services/auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent {
  messageAuthError:any
  url:any
  dataRecived:any
  decodedToken:any
  tokenRecieved:any
  constructor(private adminservice:AdminAuthService,private asd:AuthService,private route:Router,private arouter:ActivatedRoute) {  
  }
  ngOnInit(): void {

 }
  loginadmin(f:any){
   let data=f.value
   console.log("test1")
   this.adminservice.loginAdmin(data).subscribe((res)=>
     {
       this.tokenRecieved=res;
       
      localStorage.setItem('token', this.tokenRecieved);

      if ( this.tokenRecieved !== null) {
       this.decodedToken= jwt_decode( this.tokenRecieved);
     }
     if(this.decodedToken.role=="suprivisor"){
     this.route.navigate(['/suprivisor/internsprogress/',this.decodedToken._id]);
   }
     else if(this.decodedToken.role=="admin"){
       this.route.navigate(['/admin']);

     }
     console.log("test2")
     },err=>{this.messageAuthError="invalid email and password",console.log(err)})

 }
}

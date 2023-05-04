import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ServicesService } from '../services/services.service';
import { AdminAuthService } from '../services/admin-auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  messageAuthError:any
  url:any
  dataRecived:any
  decodedToken:any
  tokenRecieved:any
  constructor(private adminservice:AdminAuthService,private asd:AuthService,private route:Router,private arouter:ActivatedRoute) {
    console.log(this.asd.LoggedIn())
    
  
   }
   ngOnInit(): void {

  }
   loginadmin(f:any){
    let data=f.value
    console.log("test1")
    this.asd.login(data).subscribe((res)=>
      {
        this.tokenRecieved=res;
        
       localStorage.setItem('token', this.tokenRecieved);

       if ( this.tokenRecieved !== null) {
        this.decodedToken= jwt_decode( this.tokenRecieved);
      }
      if(this.decodedToken.role=="user" || this.decodedToken.role=="intern" ){
      this.route.navigate(['/landingpage/home']);
    }else{
      this.messageAuthError="Something wrong !!"
    }
      console.log("test2")
      },err=>{this.messageAuthError="invalid email and password",console.log(err)})

  }
}

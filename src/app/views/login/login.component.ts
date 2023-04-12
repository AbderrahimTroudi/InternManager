import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  messageAuthError:any
  url:any
  dataRecived:any
  tokenRecieved:any
  constructor(private asd:AuthService,private route:Router,private arouter:ActivatedRoute) {
    
   }
   ngOnInit(): void {

  }
   loginadmin(f:any){
    let data=f.value
    console.log("test1")
    this.asd.login(data).subscribe((res)=>
      {
        this.tokenRecieved=res;
        console.log(this.tokenRecieved)
         // Store the token in localStorage
      localStorage.setItem('token', this.tokenRecieved);
      this.route.navigate(['/landingpage/home']);
      console.log("test2")
      },err=>{this.messageAuthError="invalid email and password",console.log(err)})

  }
}

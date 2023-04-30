import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminAuthService } from 'src/app/views/services/admin-auth.service';
import { AuthService } from 'src/app/views/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  constructor(private adminservice:AdminAuthService,private route:Router,private arouter:ActivatedRoute) {
    console.log(this.adminservice.LoggedIn())
    if(this.adminservice.LoggedIn()==true){
      this.route.navigate(['/admin'])
  }
  else{
    this.route.navigate(['/auth/login'])

  }

}

logout(){
  localStorage.removeItem('token')
  this.route.navigate(['auth/login'])
}
}

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
  adminname:any
  constructor(private adminservice:AdminAuthService,private route:Router,private arouter:ActivatedRoute) {
    console.log(this.adminservice.LoggedIn())
    if(this.adminservice.LoggedIn()==true){
      this.route.navigate(['/admin'])
  }
  else{
    this.route.navigate(['/auth/login'])

  }
this.adminname = this.adminservice.getAdminName()
}

logout(){
  localStorage.removeItem('token')
  this.route.navigate(['adminlogin'])
}

navToInternArchive(){
  this.route.navigate(['/admin/internarchive'])

}
navToSupervisorArchive(){
  this.route.navigate(['/admin/supervisorarchive'])

}
}

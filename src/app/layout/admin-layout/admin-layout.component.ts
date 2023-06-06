import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminAuthService } from 'src/app/views/services/admin-auth.service';
import { AuthService } from 'src/app/views/services/auth.service';
import { ServicesService } from 'src/app/views/services/services.service';
import { map } from 'rxjs/operators';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  adminname:any
  constructor(private ds:ServicesService, private adminservice:AdminAuthService,private route:Router,private arouter:ActivatedRoute) {

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
allApplication:any
ssisRecent(dateStr: string) {
  this.ds.getAllStudents("internshipapplication/getall").subscribe(data =>{this.allApplication = data,console.log(data)})

  const today = new Date();
  const date = new Date(dateStr);
  const diff = Math.abs(today.getTime() - date.getTime());
  const diffInHours = diff / (1000 * 60 * 60);
  return diffInHours <= 48;
}

// ...

/*isRecent() {
  const thresholdHours = 24;
  const currentTime = new Date().getTime();

  this.ds.getAllStudents("application/getallapplication").subscribe((data: any[]) => {
    this.allApplication = data;
    const recentApplications = this.allApplication.filter((application: { date: string | number | Date }) => {
      const applicationTime = new Date(application.date).getTime();
      const diffInHours = (currentTime - applicationTime) / (1000 * 60 * 60);
      return diffInHours <= thresholdHours;
    });
    console.log("Recent Applications: ", recentApplications);
    console.log("Count: ", recentApplications.length);

    // Assign the count value to your variable here
    const count = recentApplications.length;
    console.log("Count variable: ", count);
    // Use the count value as needed
  });
}



}*/


}

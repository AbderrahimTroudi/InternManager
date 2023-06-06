import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminAuthService } from 'src/app/views/services/admin-auth.service';
import { AuthService } from 'src/app/views/services/auth.service';
import { ServicesService } from 'src/app/views/services/services.service';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-landingpage-layout',
  templateUrl: './landingpage-layout.component.html',
  styleUrls: ['./landingpage-layout.component.css']
})
export class LandingpageLayoutComponent {
  loggedIn = false;
  decodedToken:any
  id=''
  name=''
  constructor(private toastr: ToastrService,private service:ServicesService,private asd:AuthService,private route:Router,private arouter:ActivatedRoute) {
    if(this.asd.LoggedIn()==true){
      this.loggedIn=true;
  }
  const token = localStorage.getItem('token');
    if (token !== null) {
      this.decodedToken= jwt_decode(token);
      this.id=this.decodedToken._id
this.name=this.decodedToken.name
    }
   }
   logout(){
    localStorage.removeItem('token');
    this.route.navigate(['auth/login'])
    this.toastr.success('see you next time','logged out successfully', { timeOut: 2000 }); // Display time set to 2 seconds (2000 milliseconds)

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


  ProgresscardVisible: boolean = false;
  ProgressAndMeetRequestVisible: boolean = false;
  MeetrequestTablecardVisible: boolean = false;
  toggleProgress() {
    this.ProgresscardVisible = !this.ProgresscardVisible;
  }
  MeetrequestcardVisible: boolean = false;

  toggleMeetrequest() {
    this.MeetrequestcardVisible = !this.MeetrequestcardVisible;
  }

  MeetTableVisible() {
    this.MeetrequestTablecardVisible = !this.MeetrequestTablecardVisible;
  }

  toggleProgressAndMeetRequest() {
    this.ProgressAndMeetRequestVisible = !this.ProgressAndMeetRequestVisible;
  }
  
  MeetDescription="";
  MeetReason=""; 
  availability="";
  place=''
  Request_a_Meet() {
    this.messagesucc="";

    const MeetRequest = {
      reason: this.MeetReason,
      description: this.MeetDescription,
      availability:this.availability,
      type:this.place
    };
    console.log('New progress:', MeetRequest);
    this.service.addMeetRequest( MeetRequest,"meetrequest/register/",this.id,this.name).subscribe(data => console.log("success", data));
    // Reset the input field
    this.MeetDescription="";
    this.MeetReason="";
    this.availability="";


    this.messagesucc="Request Added"


  }

  progressDescription="";
  progressTitle="";
  messagesucc="";
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
  RequestTableData:any
  getTableRequest(){
    this.service.getappbyid("meetrequest/getbyid/",this.id).subscribe(data => this.RequestTableData = data);

  }
  deleteRequest(requestID:any,i:any){
    this.messagesucc=""
    this.service.DeleteStudent(requestID,"meetrequest/delete/").subscribe(data =>console.log(data));
    this.messagesucc="Request deleted"
    this.RequestTableData.splice(i,1)
  }

}

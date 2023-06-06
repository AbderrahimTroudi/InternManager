import { Component } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css','./s.scss']
})
export class HomepageComponent {
// create an array to store the visibility state of each card's supervisor details section
showSupervisorInfo: boolean[] = [];



// function to toggle the visibility state of a card's supervisor details section
toggleSupervisorInfo(index: number) {
// set all values in the array to false
for(let i = 0; i < this.showSupervisorInfo.length; i++) {
  this.showSupervisorInfo[i] = false;
}
// set the clicked index to true
this.showSupervisorInfo[index] = true;
}

  InternshipData:any
  searchTerm = "";
  searchResults:any
  filteredData: Internship[] = [];
  messageAuthError=""
  categories=[
    "Front-end",
    "Back-end",
    "UI/UX design",
    "Software development",
    "FullStack",
    "Mobile development",
    "BI",
    "development",
    "other"
    
  ]
  supervisorProfile:any
  constructor(private toastr: ToastrService,private asd:AuthService, private dataService: ServicesService,private route:Router,private http: HttpClient,private Route:ActivatedRoute) {
// initialize the array with false values for all cards

    this.dataService.getAllStudents("internship/getall").subscribe(
      data=>{this.InternshipData=data, this.filteredData = this.InternshipData;})
      this.boucle()
   }
   boucle(){
    for(let i = 0; i < this.filteredData.length; i++) {
      this.showSupervisorInfo.push(false);
    }
   }
  details(id:any){
    this.route.navigate(['landingpage/internshipdetails/'+id])
  }
  search(): void {
    if (this.searchTerm) {
      this.dataService.searchbar(this.searchTerm).subscribe(res => {
        this.filteredData = this.InternshipData.filter((item: Internship) =>
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
        item.status.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.requirements.toLowerCase().includes(this.searchTerm.toLowerCase())

      );

      }, (err: any) => {
        console.log(err);
      });
    } else {
      this.searchResults = [];
     
    }
  }
  Internshipapply(id: any,title:any){
    const token = localStorage.getItem('token');

     // set headers to include token
     const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  console.log({headers})
    return this.http.post('http://localhost:3000/crudapi/candidate/apply/'+id,{title},{headers})
    .subscribe((res)=>{console.log(res),   
       this.toastr.success('Done', 'Applied successfuly!'),
       this.messageAuthError="";
  },err=>{this.messageAuthError="You have already applied for this internship",console.log(err)})
  }
  hasItems(category: string): boolean {
    return this.filteredData.some(item => item.category === category);
  }

  openSuprivisorProfile(id: string): void {

    this.route.navigate(['landingpage/suprevisorprofile', id]);
  }

  getSuprevisorProfile(id:any){
    console.log("the id : ",id)
    this.dataService.getsupbyid('suprivisor/getbyid/',id).subscribe((data)=>{this.supervisorProfile=data,console.log("data:",data)})
      console.log("the result : ",this.supervisorProfile)

  }


}
interface Internship {
  _id:string;
  title: string;
  status: string;
  requirements: string;
  duration_weeks: number;
  spots_available: number;
  category:string;
  suprivisorid:string;
}
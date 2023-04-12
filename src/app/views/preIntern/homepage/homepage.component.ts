import { Component } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  InternshipData:any
  searchTerm = "";
  searchResults:any
  filteredData: Internship[] = [];
  messageAuthError=""
  constructor(private dataService: ServicesService,private route:Router,private http: HttpClient,private Route:ActivatedRoute) {
    
    this.dataService.getAllStudents("internship/getall").subscribe(
      data=>{this.InternshipData=data, this.filteredData = this.InternshipData;})
    
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
  Internshipapply(id: any){
    const token = localStorage.getItem('token');

     // set headers to include token
     const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  console.log({headers})
    return this.http.post('http://localhost:3000/crudapi/candidate/apply/'+id,{},{headers})
    .subscribe((res)=>console.log(res),err=>{this.messageAuthError="You have already applied for this internship",console.log(err)})
  }
  

}
interface Internship {
  _id:string;
  title: string;
  status: string;
  requirements: string;
  duration_weeks: number;
  spots_available: number;
}
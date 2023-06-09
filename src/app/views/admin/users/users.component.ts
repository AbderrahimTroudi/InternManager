import { query } from '@angular/animations';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  of,
} from 'rxjs';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  id = '';
  AllSuprivisor:any;
  AllData: any;
  messageSuccess = '';
  dataArray: any = [];
  messageErr = '';
  showSuprivisorTable = true;
  showCandidateTable = true;

years=["2022,2023,2024,2025"]
  databyid: any;
  filter:candidate []=[]
  constructor(
    private dataService: ServicesService,
    private route: Router,
    private http: HttpClient,
    private Route: ActivatedRoute
  ) {
    //get all from candidate table (admin + candidates)
    this.dataService.getAllStudents('candidate/getall/').subscribe((data) => {
      console.log(data);
      this.databyid = data;
      this.AllData = data;
      console.log("?????",this.AllData)
      this.filter= this.AllData
      console.log("Suprivisor number :",this.countSupervisors())
    });

      //get all suprivisors
      this.dataService.getAllStudents("suprivisor/getall").subscribe(data=>{
        this.AllSuprivisor=data
      })



      
  }
 
  ngOnInit(): void {    
  }

  countSupervisors() {
    let count = 0;
    this.AllSuprivisor.forEach((supervisor: { name: string }) => {
      count++;
    });
    return count;
  }
  createIndicators() {
    let indicators = "";
    for (let i = 0; i < this.countSupervisors(); i++) {
      if (i === 0) {
        indicators += '<li data-target="#carouselExampleIndicators" data-slide-to="' + i + '" class="active"></li>';
      } else {
        indicators += '<li data-target="#carouselExampleIndicators" data-slide-to="' + i + '"></li>';
      }
    }
    return indicators;
}

  
  /////////////////////candidate part /////////////////////
  deleteCandidate(id: any, i: number) {
    this.dataService.DeleteStudent(id, 'candidate/delete/').subscribe((response) => {
      console.log(response);
      this.AllData.splice(i, 1);//to update the suprivisor and candidate table
      this.AllSuprivisor.splice(i, 1); //to update the suprivisor card

    });
  }

  getbyidCandidate(id: any) {
    this.dataService
      .getonestudent(id, 'candidate/getdetails/')
      .subscribe((data) => {
        console.log(data);
        this.databyid = data;
      });
  }
  UpdateCandidate(f: any) { 
    let data = f.value;
    this.dataService.AddStudent(this.databyid, 'candidate/register').subscribe(
      (response) => {
        let indexId = this.AllData.findIndex(
          (obj: any) => obj._id == this.databyid.id
        );

        this.dataArray[indexId].name = data.name;
        this.dataArray[indexId].email = data.email;
        this.dataArray[indexId].password = data.password;

        this.messageSuccess = `this student ${this.dataArray[indexId].name} is updated`;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  AddCandidate(f: any) {
    let data = f.value;
console.log("candidate data : ",data)
    let x = this.dataService.AddStudent(data, 'candidate/register/').subscribe(
      (response) => {
        this.dataService.getAllStudents('candidate/getall/').subscribe((data) => {
          this.dataArray = data;
          this.AllData = data;
        });
      },
      (err: HttpErrorResponse) => {
        this.messageErr = err.error;
      }
    );
  }



  /////////////////////Suprivisor part ///////////////////
  deleteSuprivisor(id: any, i: number) {
    this.dataService.DeleteStudent(id, 'suprivisor/delete/').subscribe((response) => {
      console.log(response);
      this.AllSuprivisor.splice(i, 1);
    });
  }

  getbyidSuprivisor(id: any) {
    this.messageSuccess=""
    this.dataService
      .getonestudent(id, 'suprivisor/getbyid/')
      .subscribe((data) => {
        this.databyid = data;
        console.log("Databyid works fine: ",this.databyid)

      });
  }
  UpdateSuprivisor(f: any) {
    console.log("Update Data : ",f)

    let data = f.value;
    console.log("Update Data : ",data)
    console.log("Update Data : ",data.name)

    this.dataService.updateStudent(this.databyid._id,data,'suprivisor/update/').subscribe(
      (response) => {
      
        this.databyid.name = data.name;
        this.databyid.email = data.email;
        this.databyid.password = data.password;
        this.databyid.role = data.role;
        this.databyid.jobtitle = data.jobtitle;
        this.databyid.phone = data.phone;
        this.databyid.githublink = data.githublink;
        this.databyid.linkedinlink = data.linkedinlink;
        this.databyid.description = data.description;
        this.databyid.speacialty = data.speacialty;
   
        console.log("response : ",response)

        this.messageSuccess = `this student ${this.databyid.name} is updated`;
        this.dataService.getAllStudents("suprivisor/getall").subscribe(res=>{
          this.AllSuprivisor=res
        });
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
   
  }
  
  deleteCandidateIncandidateList(supervisorId: string, i:number) {
    console.log("id",supervisorId,"index",i)
    this.dataService.deleteCandidateIncandidateList(supervisorId, i,'suprivisor/delete/').subscribe(
      (response) => {
        this.databyid.listofcandidate.splice(i, 1);
        this.messageSuccess = `Candidate with ID ${i} has been deleted from the supervisor with ID ${supervisorId}`;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }
  deleteInternshipInInternshipList(supervisorId: string, i:number) {
    this.messageSuccess=""
    console.log("id",supervisorId,"index",i)
    this.dataService.deleteInternshipInInternshipList(supervisorId, i,'suprivisor/delete/').subscribe(
      (response) => {
        this.databyid.listofinternship.splice(i, 1);
        this.messageSuccess = `Candidate with ID ${i} has been deleted from the supervisor with ID ${supervisorId}`;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }
  
  
  AddSuprivisor(f: any) {
    let data = f.value;
    let x = this.dataService.AddStudent(data, 'suprivisor/register/').subscribe(
      (response) => {
        this.dataService.getAllStudents('suprivisor/getall/').subscribe((data) => {
          this.dataArray = data;
          this.AllSuprivisor = data;
        });
      },
      (err: HttpErrorResponse) => {
        this.messageErr = err.error;
      }
    );
  }


  openSuprivisorProfile(id: string): void {

    this.route.navigate(['/admin/suprivisorprofile', id]);
  }
  openCandidateProfile(id: string): void {

    this.route.navigate(['/admin/candidateprofile', id]);
  }






  /*details(id:any){
      this.Route.params.subscribe(params=>this.id=params['id'])

      this.dataService.getonestudent(this.id).subscribe(response=>this.dataArray=response,(err:HttpErrorResponse)=>{
          console.log(err)
        this.messageErr="We dont't found this student in our database"})
      }*/

  search(query: Observable<string>): Observable<any> {
    const apiEndpoint = 'http://localhost:3000/crudapi/search/search?q=';
    return query.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((q) =>
        this.http.get(`${apiEndpoint}${q}`).pipe(
          catchError((error) => {
            console.error('Search error:', error);
            return of([]);
          })
        )
      )
    );
  }

  getResume(id: any) {
    const url = 'http://localhost:3000/crudapi/candidate/getbyid/' + id;
    window.open(url, '_blank');
  }

/*  hasItems(date: any): boolean {
const year =this.getYearFromDate()
 const yearDate = year.substring(0, 4);
console.log("year",year)
console.log(date)
console.log("eeee",this.filter.some(item => year === date))
    return this.filter.some(item => item.created_date === yearDate );
  }


   getYearFromDate() {
      const date = new Date('2023-04-24T18:04:15.340+00:00');
    console.log("ALL data :",this.AllData)
    console.log("Predate////",this.AllData.created_date)

    console.log("Predate////",date)

    return new Date(date.getFullYear());
  }*/

  hasItems(date: string): boolean {
    const year = this.getYearFromDate(date);
    const yearDate = year.substring(0, 4);
    console.log("year", year);
    console.log("date", date);
    return this.filter.some(item => item.created_date.toISOString().substring(0, 4) === yearDate);
  }
  
  getYearFromDate(date: string): string {
    return new Date(date).getFullYear().toString();
  }


  showModal=true;
selectedItem: any;
selectedIndex: any;
openDeleteModal(item: any, i: number) {
  this.selectedItem = item;
  this.selectedIndex = i;

}
openArchiveModal(item: any, i: number) {
  this.selectedItem = item;
  this.selectedIndex = i;

}
archiveSupervisor(supervisor:any,index:any){
  console.log(supervisor)
this.dataService.archiveSupervisor(supervisor,"supervisorarchive/addtoarchive").subscribe(
  data=>{
    console.log(data),
    this.deleteSuprivisor(supervisor._id,index)
  
  })

}
archiveIntern(intern:any,index:any){
  console.log(intern)
  this.dataService.archiveSupervisor(intern,"internarchive/addtoarchive").subscribe(
    data=>{
      console.log(data),
      this.deleteCandidate(intern._id,index)
    
    })
}
}

interface candidate{
  _id:string,
  nameFL:string,
  email:string,
  phone:number,
  skills:string,
  created_date:Date;
  role:string
}
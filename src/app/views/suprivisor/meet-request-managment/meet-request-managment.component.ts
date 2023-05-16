import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-meet-request-managment',
  templateUrl: './meet-request-managment.component.html',
  styleUrls: ['./meet-request-managment.component.css']
})
export class MeetRequestManagmentComponent {
  id:any
  databyid:any
  listOfCandidateID:any
  listOfCandidate:any
  requestById:any
  seachText:any
  CommentButton:boolean = false
  ResponseComment:any
  ResponseAccORrefuse:any
  showAll:boolean = true
  constructor(
    private dataService: ServicesService,
    private route: Router,
    private http: HttpClient,
    private Route: ActivatedRoute
  )  {
  
}

AccpetTheRequest(id:any,comment:any){
this.dataService.AccpetTheRequest(id,comment,"meetrequest/update/").subscribe(data=>console.log(data))
}
RefuseTheRequest(id:any,comment:any){
  this.dataService.RefuseTheRequest(id,comment,"meetrequest/update/").subscribe(data=>console.log(data))

  }
filterCandidates(searchText: string): any[] {
  if (!searchText) {
    return this.allrequestdata;
  }
  
  return this.allrequestdata.filter((candidate: { candidate_name: string; }) => 
    candidate.candidate_name.toLowerCase().includes(searchText.toLowerCase())
  );
}
  ngOnInit() {
    this.Route.params.subscribe(params => {
      this.id = params['id'];
    });
    console.log("the id :",this.id)
    this.getallrequest()
  }
allrequestdata:any
  getallrequest() {
    this.dataService
    .getAllStudents( 'meetrequest/getall/')
    .subscribe((data) => {
      this.allrequestdata = data;
console.log("my data : ",this.allrequestdata)

    });
    
  }


  getbyid(id: any) {
    this.dataService
    .getonestudent(id, 'meetrequest/getbyid/')
    .subscribe((data) => {
      this.databyid = data;
      this.listOfCandidateID = this.databyid.listofcandidate;

      this.getCandidateDetails();

    });
    
  }
  getCandidateDetails() {
    const requests = this.listOfCandidateID.map((id: any) => this.dataService.getonestudent(id, 'meetrequest/getbyid/'));
    
    forkJoin(requests).subscribe(candidates => {
      this.listOfCandidate = candidates;
      console.log("listOfCandidate after function: ", this.listOfCandidate);
    });
  }

  showProgressById(item:any){
this.requestById = item
console.log("one single item",this.requestById)
  }

 
  isRecent(dateStr: string): boolean {
    const today = new Date();
    const date = new Date(dateStr);
    const diff = Math.abs(today.getTime() - date.getTime());
    const diffInHours = diff / (1000 * 60 * 60);
    return diffInHours <= 24;
  }
  hasRecentProgress(progressList: any[]): boolean {
    console.log(progressList)
  const currentDate = new Date();
  for (let i = 0; i < progressList.length; i++) {
    const dateAdd = new Date(progressList[i].dateAdd);
    const timeDiff = Math.abs(currentDate.getTime() - dateAdd.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60));
    if (diffDays <= 3) {
      return true;
    }
  }
  return false;
}

  
}

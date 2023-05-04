import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { forkJoin } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';

@Component({  
  selector: 'app-intern-managment',
  templateUrl: './intern-managment.component.html',
  styleUrls: ['./intern-managment.component.css'],
})

export class InternManagmentComponent
{
  id:any
  databyid:any
  listOfCandidateID:any
  listOfCandidate:any
  progressHold:any
  seachText:any
  constructor(
    private dataService: ServicesService,
    private route: Router,
    private http: HttpClient,
    private Route: ActivatedRoute
  )  {
  
}
filterCandidates(searchText: string): any[] {
  if (!searchText) {
    return this.listOfCandidate;
  }
  
  return this.listOfCandidate.filter((candidate: { nameFL: string; }) => 
    candidate.nameFL.toLowerCase().includes(searchText.toLowerCase())
  );
}

  ngOnInit() {
    this.Route.params.subscribe(params => {
      this.id = params['id'];
    });
    console.log("the id :",this.id)
    this.getbyid(this.id)
  }
  getbyid(id: any) {
    this.dataService
    .getonestudent(id, 'suprivisor/getbyid/')
    .subscribe((data) => {
      this.databyid = data;
      this.listOfCandidateID = this.databyid.listofcandidate;
      this.getCandidateDetails();

    });
    
  }
  getCandidateDetails() {
    const requests = this.listOfCandidateID.map((id: any) => this.dataService.getonestudent(id, 'candidate/getdetails/'));
    
    forkJoin(requests).subscribe(candidates => {
      this.listOfCandidate = candidates;
      console.log("listOfCandidate: ", this.listOfCandidate);
    });
  }

  showProgressById(item:any){
this.progressHold = item
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
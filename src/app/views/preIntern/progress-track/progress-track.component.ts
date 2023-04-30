import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-progress-track',
  templateUrl: './progress-track.component.html',
  styleUrls: ['./progress-track.component.css']
})
export class ProgressTrackComponent {
  progressList:any []=[];
  sortAscending: boolean = true;
  id: any;
list :any
  constructor(
    private dataService: ServicesService,
    private route: Router,
    private http: HttpClient,
    private Route: ActivatedRoute
  ) {
    
  }
  ngOnInit() {
    this.Route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getProgress(this.id)
    console.log(this.id)
  }
  getProgress(id:any){
    this.dataService.getappbyid("candidate/getprogress/",id).subscribe(data =>
      {this.list = data
        console.log(data)
      this.progressList = this.list.progressList
      console.log(this.progressList)
    
      })
      }




/* ////////////////////////////////////////////failed attemp to sort the progress cards
  sortProgress() {
    this.progressList.sort((a, b) => {
      if (this.sortAscending) {
        return a.date.getTime() - b.date.getTime();
      } else {
        return b.date.getTime() - a.date.getTime();
      }
    });
    this.sortAscending = !this.sortAscending;
  }*/ 
 


  
}

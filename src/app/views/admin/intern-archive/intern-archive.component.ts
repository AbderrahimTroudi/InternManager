import { Component } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-intern-archive',
  templateUrl: './intern-archive.component.html',
  styleUrls: ['./intern-archive.component.css']
})
export class InternArchiveComponent {
  AllData:any

  databyid:any

  constructor(
    private dataService: ServicesService) 
    {
    //get all from candidate table (admin + candidates)
    this.dataService.getAllStudents('internarchive/getall/').subscribe((data) => {
      this.AllData = data;
  
    });     
  }


  getbyidCandidate(id: any) {
    this.dataService
      .getonestudent(id, 'internarchive/getdetails/')
      .subscribe((data) => {
        console.log(data);
        this.databyid = data;
      });
  }

  showModal=true;
selectedItem: any;
selectedIndex: any;
openDeleteModal(item: any, i: number) {
  this.selectedItem = item;
  this.selectedIndex = i;

}

deleteCandidate(id: any, i: number) {
  this.dataService.DeleteStudent(id, 'internarchive/delete/').subscribe((response) => {
    console.log(response);
    this.AllData.splice(i, 1);//to update the suprivisor and candidate table

  });
}
}

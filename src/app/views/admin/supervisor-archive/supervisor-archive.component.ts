import { Component } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { NotifTestServiceService } from '../../services/notif-test-service.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-supervisor-archive',
  templateUrl: './supervisor-archive.component.html',
  styleUrls: ['./supervisor-archive.component.css']
})
export class SupervisorArchiveComponent implements OnInit  {
  AllData:any

  databyid:any
  notifications: any[] = [];

  constructor(
    private dataService: ServicesService,private socketService: NotifTestServiceService) 
    {
    this.dataService.getAllStudents('supervisorarchive/getall/').subscribe((data) => {
      this.AllData = data;
    
    });     
  }


  ngOnInit(): void {

  }
  getbyidCandidate(id: any) {
    this.dataService
      .getonestudent(id, 'supervisorarchive/getbyid/')
      .subscribe((data) => {
        console.log(data);
        this.databyid = data;
      });
      this.socketService.ngOnInit();
  }

  showModal=true;
selectedItem: any;
selectedIndex: any;
openDeleteModal(item: any, i: number) {
  this.selectedItem = item;
  this.selectedIndex = i;

}

deleteCandidate(id: any, i: number) {
  this.dataService.DeleteStudent(id, 'supervisorarchive/delete/').subscribe((response) => {
    console.log(response);
    this.AllData.splice(i, 1);//to update the suprivisor and candidate table

  });
}
}

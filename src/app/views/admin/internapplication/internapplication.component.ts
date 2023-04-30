import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-internapplication',
  templateUrl: './internapplication.component.html',
  styleUrls: ['./internapplication.component.css']
})
export class InternapplicationComponent {
  id=''
  all:any
  AllData:any
  messageSuccess=''
  dataArray:any=[]
  messageErr=''
 
  showModal = false;
   buttonDisabled: boolean[] = [];

    constructor(private dataService: ServicesService,private route:Router,private http: HttpClient,private Route:ActivatedRoute) {
      this.dataService.getAllStudents("application/getallapplication").subscribe(data=>{
        this.dataArray=data
  console.log(this.AllData)
  console.log(this.dataArray)

      })
      
     }
  ngOnInit(): void {
    
  }
  showConfirmationModal() {
    this.showModal = true;
  }

  // function to confirm the action and disable the buttons
  /*confirmAction() {
    this.buttonDisabled = true;
    this.showModal = false;
  }*/
    
    handleModalOpen() {
      // function to be executed when the modal is opened
      console.log('Modal opened!');
      // call some function here
    }
    delete(id:any,i:number){
  
      this.dataService.DeleteStudent(id,"application/delete/").subscribe(response=>{
        console.log(response)
         this.AllData.splice(i,1)
  
      })
  
    }
details(id:any){
 
  console.log(id)
    this.dataService.getonestudent(id,"application/getbyid/").subscribe(response=>{
             this.all=response
     console.log(this.dataArray)
    },(err:HttpErrorResponse)=>{
      this.messageErr=err.error
  
    })
    }
nav(id:any){
      this.route.navigate(['admin/profile/',id])
    }
    disableButton(i:any){
      console.log("button1: ",i)

      this.buttonDisabled[i]= false;
console.log("button2: ",this.buttonDisabled[i])
    }
  accpet(id:any,i:any)
{ 
console.log("////data_array////",this.dataArray)

  this.dataService.updateStudent(id,{status:'accepted'},"application/update/").subscribe((res: any) => {
    console.log(res);
    this.disableButton(i)
    // do something with the response
  }, (err: any) => {
    console.log(err);
    this.buttonDisabled[i] = false;

  });
}

refuse(id:any){
  console.log("////data_array////",this.dataArray)

  this.dataService.updateStudent(id,{status:"Refused"},"application/update/").subscribe((res: any) => {
    console.log(res);
   // this.buttonDisabled = true;

    // do something with the response
  }, (err: any) => {
    console.log(err);
   // this.buttonDisabled = false;

  });
}

}

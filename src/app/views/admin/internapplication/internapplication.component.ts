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

      this.buttonDisabled[i]= true;
    }
  accpet(id:any,i:any)
{ 
console.log("////data_array////",this.dataArray)

  this.dataService.updateStudent(id,{status:'accepted'},"application/update/").subscribe((res: any) => {
    console.log(res);
   
    // do something with the response
  }, (err: any) => {
    console.log(err);

  });

  
}

refuse(id:any){
  console.log("////data_array////",this.dataArray)

  this.dataService.updateStudent(id,{status:"refused"},"application/update/").subscribe((res: any) => {
    console.log(res);
   // this.buttonDisabled = true;

    // do something with the response
  }, (err: any) => {
    console.log(err);
   // this.buttonDisabled = false;

  });
 
}
disabled(status:any){
  if(status!="submitted"){
    return false
  }
  return true
}




selectedItem: any;
selectedIndex: any;
openAcceptModal(item: any, i: number) {
  this.selectedItem = item;
  this.selectedIndex = i;

}






}

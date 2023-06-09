import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styleUrls: ['./internship.component.css']
})
export class InternshipComponent implements OnInit {
  id=''
  all:any
  AllData:any
  messageSuccess=''
  dataArray:any=[]
  messageErr=''
    InternshipData={
      title:'',
      status:'',
      requirements:'',
      duration_weeks:'',
      spots_available:'',
      category:'',
      id:'',
    }
    supervisors :any;

    constructor(private dataService: ServicesService,private route:Router,private http: HttpClient,private Route:ActivatedRoute) {
      this.dataService.getAllStudents("internship/getall").subscribe(data=>{
        this.dataArray=data
        this.AllData=data
  console.log(this.AllData)
  console.log(this.dataArray)
  this.dataService.getAllSuprivisor('/getall').subscribe(res=>{
    console.log("response : ",res)
    this.supervisors= res;
  }) ; 

      })
      
      
     }
  ngOnInit(): void {
    
  }
  
    
    handleModalOpen() {
      // function to be executed when the modal is opened
      console.log('Modal opened!');
      // call some function here
    }
    delete(id:any,i:number){
  
      this.dataService.DeleteStudent(id,"internship/delete/").subscribe(response=>{
        console.log(response)
         this.AllData.splice(i,1)
  
      })
  
    }
  databyid:any
  getbyidInternship(id: any) {
    this.dataService
      .getonestudent(id, 'internship/getbyid/')
      .subscribe((data) => {
        console.log(data);
        this.databyid = data;
      });
  }
    getdata(title:string,status:string,requirements:string,duration_weeks:string,spots_available:string,id:any){
      this.messageSuccess=''
      this.InternshipData.title=title
      this.InternshipData.status=status
      this.InternshipData.requirements=requirements
      this.InternshipData.duration_weeks=duration_weeks
      this.InternshipData.spots_available=spots_available

      this.InternshipData.id=id
  
    }
  
    UpdateUser(f:any){
      let data=f.value
      this.dataService.updateStudent(this.databyid._id,data,"internship/update/").subscribe(response=>
        {
  
          let indexId=this.AllData.findIndex((obj:any)=>obj._id==this.databyid._id)
  
          this.dataArray[indexId].title=data.title
          this.dataArray[indexId].description=data.description
          this.dataArray[indexId].requirements=data.requirements
          this.dataArray[indexId].duration_weeks=data.duration_weeks
          this.dataArray[indexId].start_date=data.start_date
          this.dataArray[indexId].end_date=data.end_date
          this.dataArray[indexId].max_candidates=data.max_candidates
          this.dataArray[indexId].spots_available=data.spots_available
          this.dataArray[indexId].status=data.status
          this.dataArray[indexId].category=data.category


        
  
  
  
          this.messageSuccess=`this student ${this.dataArray[indexId].name} is updated`
  
  
        },(err:HttpErrorResponse)=>{
          console.log(err.message)
        
        })
    }
  
  


    AddUser(f:any){
      let data=f.value
  console.log("test data : ",data)
      let x = this.dataService.AddStudent(data,"internship/register").subscribe(response=>{
        this.dataService.getAllStudents("internship/getall").subscribe(data=>{
          this.dataArray=data
          this.AllData=data
        })
      },(err:HttpErrorResponse)=>{
        console.log(err)
    
      })
      
    }


details(id:any){
 
  console.log(id)
    this.dataService.getonestudent(id,"internship/getbyid/").subscribe(response=>{
             this.all=response
     console.log(this.dataArray)
    },(err:HttpErrorResponse)=>{
      this.messageErr=err.error
  
    })
    }

    getAllSupervisors() {
   
    }
showModal:any
    selectedItem: any;
selectedIndex: any;
openAcceptModal(item: any, i: number) {
  this.selectedItem = item;
  this.selectedIndex = i;

}

  }

import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-internship-details',
  templateUrl: './internship-details.component.html',
  styleUrls: ['./internship-details.component.css']
})
export class InternshipDetailsComponent {
  id=''
  dataObject:any
  messageErr=''
  supervisorProfile:any
  constructor(private route:ActivatedRoute,private ds:ServicesService) {
    this.route.params.subscribe(params=>this.id=params['id'])

    this.ds.getonestudent(this.id,"internship/getbyid/").subscribe(response=>
      {this.dataObject=response,this.getSuprevisorProfile(this.dataObject.suprivisorid)},
      (err:HttpErrorResponse)=>{console.log(err)
      this.messageErr="We dont't found this Internship in our database"})
      
   
   
    }
  
    getSuprevisorProfile(id:any){
      console.log("the id : ",id)
      this.ds.getsupbyid('suprivisor/getbyid/',id).subscribe((data)=>{this.supervisorProfile=data,console.log("data:",data)})
        console.log("the result : ",this.supervisorProfile)
    }
 
 
}

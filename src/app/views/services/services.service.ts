import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) {}

  getAllStudents(query:any){
     return this.http.get('http://localhost:3000/crudapi/'+query)
  }
  AddStudent(account:any,query:any){
 console.log(account)
   return this.http.post('http://localhost:3000/crudapi/'+query,account)
 }
 getdetails(id:any,query:any){
  return this.http.get('http://localhost:3000/crudapi/'+query+id)

}
 DeleteStudent(id:String,query:any){
   
   return this.http.delete('http://localhost:3000/crudapi/'+query+id)
 }
 
 updateStudent(id:String,account:any,query:any){
   
   return this.http.put('http://localhost:3000/crudapi/'+query+id,account)
 }
 getonestudent(id:any,query:any){
   return this.http.get('http://localhost:3000/crudapi/'+query+id)
 
 }
 Internshipapply(id: any,header:any) {
  return this.http.post('http://localhost:3000/crudapi/candidate/apply/', id);
}


 //////////////////////////////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////////////////////////
 searchbar(query:any){
   return this.http.get('http://localhost:3000/crudapi/internship/search?q='+query)
 }
}

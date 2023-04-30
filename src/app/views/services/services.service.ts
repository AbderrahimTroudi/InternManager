import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  decodedToken: any;
  helper: any;

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
   console.log("id : ",id)
   console.log("account : ",account)
   console.log("query : ",query)

   return this.http.put('http://localhost:3000/crudapi/'+query+id,account)
 }
 getonestudent(id:any,query:any){
   return this.http.get('http://localhost:3000/crudapi/'+query+id)
 
 }
 Internshipapply(id: any,header:any) {
  return this.http.post('http://localhost:3000/crudapi/candidate/apply/', id);
}

getappbyid(query:any,id: any) {
  return this.http.get('http://localhost:3000/crudapi/'+query+id)
}
getsupbyid(query:any,id: any) {
  return this.http.get('http://localhost:3000/crudapi/'+query+id)
}

getAllSuprivisor(query:any){
  return this.http.get('http://localhost:3000/crudapi/suprivisor'+query)
}
addProgress(query:any,progress:any,id:any){
  const body = { title: progress.title ,description: progress.description};

  return this.http.post('http://localhost:3000/crudapi/'+query+id,body)

}
 //////////////////////////////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////////////////////////
 searchbar(query:any){
   return this.http.get('http://localhost:3000/crudapi/internship/search?q='+query)
 }
}



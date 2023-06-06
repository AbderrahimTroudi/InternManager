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
addInternshipBySupervisor(account:any,query:any,id:any){
  console.log(account)
    return this.http.post('http://localhost:3000/crudapi/'+query+id,account)
  }
 getdetails(id:any,query:any){
  return this.http.get('http://localhost:3000/crudapi/'+query+id)

}
 DeleteStudent(id:String,query:any){
   
   return this.http.delete('http://localhost:3000/crudapi/'+query+id)
 }
 
 deleteCandidateIncandidateList(idSuprevisor:String,idCandidate:any,query:any){
   
  return this.http.delete('http://localhost:3000/crudapi/'+query+idSuprevisor+'/candidate/'+idCandidate)
}
deleteInternshipInInternshipList(idSuprevisor:String,internshipIndex:any,query:any){
   
  return this.http.delete('http://localhost:3000/crudapi/'+query+idSuprevisor+'/internship/'+internshipIndex)
}
 updateStudent(id:String,account:any,query:any){
console.log("the service id ",id)
console.log("the account id ",account)
console.log("the query id ",query)

   return this.http.put('http://localhost:3000/crudapi/'+query+id,account)
 }
 getonestudent(id:any,query:any){
  console.log("this is the id ",id)
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

addMeetRequest(account:any,query:any,internID:any,internname:any){
  console.log(account)
    return this.http.post('http://localhost:3000/crudapi/'+query+internID+'/'+internname,account)
  }
  AccpetTheRequest(idRequest:any,comment:any,query:any){
    const body = {
      comment: comment,
      response: "accepted"
    }
    return this.http.put('http://localhost:3000/crudapi/'+query+idRequest,body)
  }
  RefuseTheRequest(idRequest:any,comment:any,query:any){
    const body = {
      comment: comment,
      response: "refused"
    }
    return this.http.put('http://localhost:3000/crudapi/'+query+idRequest,body)
  }




  archiveIntern(account:any,query:any){
      return this.http.post('http://localhost:3000/crudapi/'+query,account)
    }

    archiveSupervisor(account:any,query:any){
        return this.http.post('http://localhost:3000/crudapi/'+query,account)
      }



 //////////////////////////////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////////////////////////
 searchbar(query:any){
   return this.http.get('http://localhost:3000/crudapi/internship/search?q='+query)
 }
}



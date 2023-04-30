import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  decodedToken: any;

  constructor(private http:HttpClient) { 
    
  }
  login(data:any){
console.log(data)
    return this.http.post('http://localhost:3000/crudapi/auth/login',data)
  } 

  LoggedIn(){
    let token:any=localStorage.getItem('token')
    console.log("///admin AUTH service token//",token)
    if(!token){
     return false
    }
    this.decodedToken= jwt_decode(token);
   
    console.log("///ROLE/// : ",this.decodedToken.role)

  if(this.decodedToken.role!=='admin'){
      return false
    }
    return true
  }
}

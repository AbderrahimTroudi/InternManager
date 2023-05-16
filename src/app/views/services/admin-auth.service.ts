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
  loginAdmin(data:any){
console.log(data)
    return this.http.post('http://localhost:3000/crudapi/auth/loginadmin',data)
  } 

  LoggedIn(){
    let token:any=localStorage.getItem('token')
    if(!token){
     return false
    }
    this.decodedToken= jwt_decode(token);
   
  if(this.decodedToken.role!=='admin'){
      return false
    }
    return true
  }
  getAdminName(){
    return this.decodedToken.name
  }
}

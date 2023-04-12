import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { 
    
  }
  login(data:any){
console.log(data)
    return this.http.post('http://localhost:3000/crudapi/auth/login',data)
  } 
}

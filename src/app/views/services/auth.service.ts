import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  decodedToken: any;

  constructor(private http: HttpClient) {}
  login(data: any) {
    return this.http.post('http://localhost:3000/crudapi/auth/login', data);
  }
  loginMentor(data: any) {
    return this.http.post('http://localhost:3000/crudapi/auth/loginadmin', data);
  }

  LoggedIn() {
    let token: any = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    this.decodedToken = jwt_decode(token);

    if (this.decodedToken.role !== 'user' && this.decodedToken.role !== 'intern') {
      return false;
    }

    return true;
  }
  MentorLoggedIn() {
    let token: any = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    this.decodedToken = jwt_decode(token);

    if (this.decodedToken.role !== 'suprivisor') {
      return false;
    }

    return true;
  }
}

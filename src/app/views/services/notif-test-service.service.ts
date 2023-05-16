
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifTestServiceService {
  private socket: Socket;
data:any = []
  constructor() {
    this.socket = io('http://localhost:3100', { transports: ['websocket'] });  }
    public ngOnInit(): void {
      console.log("test/////////////////////")
      this.socket.on('notification', data => {
        this.data.push(data)
        console.log("it fuking works : ",this.data)

      });
    }
   
    
  

}

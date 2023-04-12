import { query } from '@angular/animations';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  of,
} from 'rxjs';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  id = '';
  AllData: any;
  messageSuccess = '';
  dataArray: any = [];
  messageErr = '';

  databyid: any;

  constructor(
    private dataService: ServicesService,
    private route: Router,
    private http: HttpClient,
    private Route: ActivatedRoute
  ) {
    this.dataService.getAllStudents('candidate/getall/').subscribe((data) => {
      console.log(data);
      this.databyid = data;
      this.AllData = data;
    });
  }
  ngOnInit(): void {}

  handleModalOpen() {
    // function to be executed when the modal is opened
    console.log('Modal opened!');
    // call some function here
  }
  delete(id: any, i: number) {
    this.dataService.DeleteStudent(id, 'delete/').subscribe((response) => {
      console.log(response);
      this.AllData.splice(i, 1);
    });
  }

  getbyid(id: any) {
    this.dataService
      .getonestudent(id, 'candidate/getdetails/')
      .subscribe((data) => {
        console.log(data);
        this.databyid = data;
      });
  }
  UpdateUser(f: any) {
    let data = f.value;
    this.dataService.AddStudent(this.databyid, 'register').subscribe(
      (response) => {
        let indexId = this.AllData.findIndex(
          (obj: any) => obj._id == this.databyid.id
        );

        this.dataArray[indexId].name = data.name;
        this.dataArray[indexId].email = data.email;
        this.dataArray[indexId].password = data.password;

        this.messageSuccess = `this student ${this.dataArray[indexId].name} is updated`;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  AddUser(f: any) {
    let data = f.value;

    let x = this.dataService.AddStudent(data, 'register/').subscribe(
      (response) => {
        this.dataService.getAllStudents('getall/').subscribe((data) => {
          this.dataArray = data;
          this.AllData = data;
        });
      },
      (err: HttpErrorResponse) => {
        this.messageErr = err.error;
      }
    );
  }

  /*details(id:any){
      this.Route.params.subscribe(params=>this.id=params['id'])

      this.dataService.getonestudent(this.id).subscribe(response=>this.dataArray=response,(err:HttpErrorResponse)=>{
          console.log(err)
        this.messageErr="We dont't found this student in our database"})
      }*/

  search(query: Observable<string>): Observable<any> {
    const apiEndpoint = 'http://localhost:3000/crudapi/search/search?q=';
    return query.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((q) =>
        this.http.get(`${apiEndpoint}${q}`).pipe(
          catchError((error) => {
            console.error('Search error:', error);
            return of([]);
          })
        )
      )
    );
  }

  getResume(id: any) {
    const url = 'http://localhost:3000/crudapi/candidate/getbyid/' + id;
    window.open(url, '_blank');
  }
}

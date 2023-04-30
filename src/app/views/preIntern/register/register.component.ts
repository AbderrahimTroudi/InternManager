import { Component } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ThemePalette } from '@angular/material/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrl } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  formData = {
    nameFL: '',
    email: '',
    password: '',
    phone: '',
    skills: '',
    file: null,
  };
  fileUrl: SafeUrl;
  safeUrl: SafeResourceUrl;
  sucessMSG = '';
  currentStep = 1;
  messageErr = '';
  candidate: any;
  loading=false;

  constructor(
    private ds: ServicesService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.fileUrl = this.sanitizer.bypassSecurityTrustUrl('');
    this.safeUrl = this.sanitizer.bypassSecurityTrustUrl('');
    const candidateId = this.route.snapshot.params['id'];
    this.ds
      .getonestudent(candidateId, 'candidate/getbyid/')
      .subscribe((data) => {
        this.candidate = data;

        // Set the safeUrl using the DomSanitizer
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.candidate.resume_url
        );
      });
  }

  onSubmit() {

    const form = new FormData();
    form.append('nameFL', this.formData.nameFL);
    form.append('email', this.formData.email);
    form.append('password', this.formData.password);
    form.append('phone', this.formData.phone);
    form.append('skills', this.formData.skills);
    if (this.formData.file !== null) {
      form.append('file', this.formData.file);
    }
   if(form== null){          this.messageErr = 'fill the form';
  }
  else{
    this.loading=true;

    this.http
      .post('http://localhost:3000/crudapi/candidate/register', form)
      .subscribe(
        (response) => {
          this.messageErr = '';
          this.sucessMSG = 'success'; // you will need to change arround this part to be if(success == > navigate candidate application list)
          this.loading=false;
        },
        (err: HttpErrorResponse) => {
          this.messageErr = err.error;
          this.sucessMSG = '';
        }
      );
    }
  }

  onFileSelected(event: any) {
    this.formData.file = event.target.files[0];
  }

  getFile() {
    const url = `http://localhost:3000/crudapi/candidate/getbyid/64301dc283bc983f031a0e9d`;
    return this.http.get(url);
  }
}

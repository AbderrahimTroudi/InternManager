import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import {HttpClientModule} from '@angular/common/http';
import { InternshipApplicationComponent } from './views/preIntern/internship-application/internship-application.component';
import { ApplicationStatusComponent } from './views/preIntern/application-status/application-status.component';
import { InternshipDetailsComponent } from './views/preIntern/internship-details/internship-details.component';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SuprivisorProfileComponent } from './views/suprivisor/suprivisor-profile/suprivisor-profile.component';
import { InternManagmentComponent } from './views/suprivisor/intern-managment/intern-managment.component';
import { InternshipManagmentComponent } from './views/suprivisor/internship-managment/internship-managment.component';
import { FormsModule } from '@angular/forms';
import { ProgressTrackComponent } from './views/preIntern/progress-track/progress-track.component';
@NgModule({
  declarations: [
    AppComponent,
    InternshipApplicationComponent,
    ApplicationStatusComponent,
    InternshipDetailsComponent,
    SuprivisorProfileComponent,
    InternManagmentComponent,
    InternshipManagmentComponent,
    ProgressTrackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

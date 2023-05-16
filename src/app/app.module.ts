import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import {HttpClientModule} from '@angular/common/http';
import { InternshipApplicationComponent } from './views/preIntern/internship-application/internship-application.component';
import { ApplicationStatusComponent } from './views/preIntern/application-status/application-status.component';
import { InternshipDetailsComponent } from './views/preIntern/internship-details/internship-details.component';
import { HighchartsChartModule } from 'highcharts-angular';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SuprivisorProfileComponent } from './views/suprivisor/suprivisor-profile/suprivisor-profile.component';
import { InternManagmentComponent } from './views/suprivisor/intern-managment/intern-managment.component';
import { InternshipManagmentComponent } from './views/suprivisor/internship-managment/internship-managment.component';
import { FormsModule } from '@angular/forms';
import { ProgressTrackComponent } from './views/preIntern/progress-track/progress-track.component';
import { HomeComponent } from './views/suprivisor/home/home.component';
import { MeetRequestManagmentComponent } from './views/suprivisor/meet-request-managment/meet-request-managment.component';
import { SupervisorArchiveComponent } from './views/admin/supervisor-archive/supervisor-archive.component';
import { InternArchiveComponent } from './views/admin/intern-archive/intern-archive.component';
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
    HomeComponent,
    MeetRequestManagmentComponent,
    SupervisorArchiveComponent,
    InternArchiveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

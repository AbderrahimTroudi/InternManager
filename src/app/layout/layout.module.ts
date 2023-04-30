import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { AuthComponent } from './auth/auth.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { InternLayoutComponent } from './intern-layout/intern-layout.component';
import { LandingpageLayoutComponent } from './landingpage-layout/landingpage-layout.component';
import { SuprivisorLayoutComponent } from './suprivisor-layout/suprivisor-layout.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AuthComponent,
    AdminLayoutComponent,
    InternLayoutComponent,
    LandingpageLayoutComponent,
    SuprivisorLayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule
  ]
})
export class LayoutModule { }

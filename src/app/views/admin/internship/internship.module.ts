import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternshipRoutingModule } from './internship-routing.module';
import { InternshipComponent } from './internship.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InternshipComponent
  ],
  imports: [
    CommonModule,
    InternshipRoutingModule,
    FormsModule
  ]
})
export class InternshipModule { }

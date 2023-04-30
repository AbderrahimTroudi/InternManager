import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternapplicationRoutingModule } from './internapplication-routing.module';
import { InternapplicationComponent } from '../internapplication/internapplication.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InternapplicationComponent
  ],
  imports: [
    CommonModule,
    InternapplicationRoutingModule,
    FormsModule
  ]
})
export class InternapplicationModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternshipApplicationComponent } from './internship-application.component';

const routes: Routes = [{
  path:'',component:InternshipApplicationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternshipApplicationRoutingModule { }

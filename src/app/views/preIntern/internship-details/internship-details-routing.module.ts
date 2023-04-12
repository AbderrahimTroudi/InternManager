import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternshipComponent } from '../../admin/internship/internship.component';
import { InternshipDetailsComponent } from './internship-details.component';

const routes: Routes = [{
  path:'',component:InternshipDetailsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternshipDetailsRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInternshipComponent } from './add-internship.component';

const routes: Routes = [{
  path:'',component:AddInternshipComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddInternshipRoutingModule { }

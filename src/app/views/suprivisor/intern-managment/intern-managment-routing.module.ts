import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternManagmentComponent } from './intern-managment.component';

const routes: Routes = [{
  path:'',component:InternManagmentComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternManagmentRoutingModule { }

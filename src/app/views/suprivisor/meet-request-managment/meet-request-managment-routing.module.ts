import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetRequestManagmentComponent } from './meet-request-managment.component';

const routes: Routes = [{
  path:'',component:MeetRequestManagmentComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetRequestManagmentRoutingModule { }

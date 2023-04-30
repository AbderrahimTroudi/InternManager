import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationStatusComponent } from './application-status.component';

const routes: Routes = [{
  path:'',component:ApplicationStatusComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationStatusRoutingModule { }

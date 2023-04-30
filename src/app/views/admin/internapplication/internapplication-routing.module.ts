import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternapplicationComponent } from './internapplication.component';

const routes: Routes = [{
  path:'',component:InternapplicationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternapplicationRoutingModule { }

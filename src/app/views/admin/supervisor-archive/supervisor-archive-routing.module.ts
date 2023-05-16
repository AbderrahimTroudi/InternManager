import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupervisorArchiveComponent } from './supervisor-archive.component';

const routes: Routes = [
  { 
  path:'',component:SupervisorArchiveComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorArchiveRoutingModule { }

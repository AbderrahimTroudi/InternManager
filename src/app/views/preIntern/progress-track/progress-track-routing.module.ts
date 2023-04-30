import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgressTrackComponent } from './progress-track.component';

const routes: Routes = [{
  path:'',component:ProgressTrackComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgressTrackRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternArchiveComponent } from './intern-archive.component';

const routes: Routes = [{
  path: '',component:InternArchiveComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternArchiveRoutingModule { }

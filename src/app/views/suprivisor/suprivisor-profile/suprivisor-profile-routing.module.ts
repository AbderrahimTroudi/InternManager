import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuprivisorLayoutComponent } from 'src/app/layout/suprivisor-layout/suprivisor-layout.component';
import { SuprivisorProfileComponent } from './suprivisor-profile.component';

const routes: Routes = [
  {path:'',component:SuprivisorProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuprivisorProfileRoutingModule { }

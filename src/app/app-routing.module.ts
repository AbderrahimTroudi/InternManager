import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { LandingpageLayoutComponent } from './layout/landingpage-layout/landingpage-layout.component';
import { AuthComponent } from './layout/auth/auth.component';
import { SuprivisorLayoutComponent } from './layout/suprivisor-layout/suprivisor-layout.component';

const routes: Routes = [{
  path: '', 
  component: LandingpageLayoutComponent,children:[
    {path:'',loadChildren:()=>import('./views/preIntern/homepage/homepage.module').then(m => m.HomepageModule)}

  ]
},

{path:'admin', component:AdminLayoutComponent,children:[
    {path: 'users',loadChildren: () => import('./views/admin/users/users.module').then(m => m.UsersModule)},
    { path: 'suprivisorprofile/:id',loadChildren: () => import('./views/suprivisor/suprivisor-profile/suprivisor-profile.module').then(m => m.SuprivisorProfileModule)},
    {path: 'internships',loadChildren: () => import('./views/admin/internship/internship.module').then(m => m.InternshipModule)},
    {path: 'Internshipapplications',loadChildren: () => import('./views/admin/internapplication/internapplication.module').then(m => m.InternapplicationModule)},
    {path:'profile/:id',loadChildren:()=>import('./views/profile/profile.module').then(m=> m.ProfileModule)},

  ]
},
{path:'landingpage',component:LandingpageLayoutComponent,children:[
  {path:'home',loadChildren:()=>import('./views/preIntern/homepage/homepage.module').then(m => m.HomepageModule)},
  {path:'internshipdetails/:id',loadChildren:()=>import('./views/preIntern/internship-details/internship-details.module').then(m=> m.InternshipDetailsModule)},
  {path:'applicationstatus',loadChildren:()=>import('./views/preIntern/application-status/application-status.module').then(m=> m.ApplicationStatusModule)},
  {path:'profile/:id',loadChildren:()=>import('./views/profile/profile.module').then(m=> m.ProfileModule)},
  {path:'suprevisorprofile/:id',loadChildren:()=> import('./views/suprivisor/suprivisor-profile/suprivisor-profile.module').then(m => m.SuprivisorProfileModule)},
  {path:'progress/:id',loadChildren:()=> import('./views/preIntern/progress-track/progress-track.module' ).then(m => m.ProgressTrackModule)}



]},
{path:'auth',component:AuthComponent,children:[
  {path:'register',loadChildren:()=>import('./views/preIntern/register/register.module').then(m => m.RegisterModule)},
  {path:'login',loadChildren:()=>import('./views/login/login.module').then(m => m.LoginModule)}

]}, 
{path:'suprivisor',component:SuprivisorLayoutComponent,children:[
  {path:'profile/:id',loadChildren:()=>import('./views/suprivisor/suprivisor-profile/suprivisor-profile.module').then(m => m.SuprivisorProfileModule)},
  {path:'internsprogress',loadChildren:()=>import('./views/suprivisor/intern-managment/intern-managment.module').then(m => m.InternManagmentModule)}

]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

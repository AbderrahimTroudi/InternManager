import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { LandingpageLayoutComponent } from './layout/landingpage-layout/landingpage-layout.component';
import { AuthComponent } from './layout/auth/auth.component';
import { SuprivisorLayoutComponent } from './layout/suprivisor-layout/suprivisor-layout.component';
import { AdminAuthComponent } from './layout/admin-auth/admin-auth.component';

const routes: Routes = [{
  path: '', 
  component: LandingpageLayoutComponent,children:[
    {path:'',loadChildren:()=>import('./views/preIntern/homepage/homepage.module').then(m => m.HomepageModule)}

  ]
},
{
  path: 'adminlogin', 
  component: AdminAuthComponent

},
{path:'admin', component:AdminLayoutComponent,children:[

  {path: 'dashboard',loadChildren: () => import('./views/admin/dashboard/dashboard.module').then(m => m.DashboardModule)},

    {path: 'users',loadChildren: () => import('./views/admin/users/users.module').then(m => m.UsersModule)},
    { path: 'suprivisorprofile/:id',loadChildren: () => import('./views/suprivisor/suprivisor-profile/suprivisor-profile.module').then(m => m.SuprivisorProfileModule)},
    {path: 'internships',loadChildren: () => import('./views/admin/internship/internship.module').then(m => m.InternshipModule)},
    {path: 'Internshipapplications',loadChildren: () => import('./views/admin/internapplication/internapplication.module').then(m => m.InternapplicationModule)},
    {path:'candidateprofile/:id',loadChildren:()=>import('./views/profile/profile.module').then(m=> m.ProfileModule)},
    {path:'internarchive',loadChildren:()=>import('./views/admin/intern-archive/intern-archive.module').then(m=> m.InternArchiveModule)},
    {path:'supervisorarchive',loadChildren:()=>import('./views/admin/supervisor-archive/supervisor-archive.module').then(m=> m.SupervisorArchiveModule)},

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
  {path:'home',loadChildren:()=>import('./views/suprivisor/home/home.module').then(m => m.HomeModule)},
  {path:'meetrequest/:id',loadChildren:()=>import('./views/suprivisor/meet-request-managment/meet-request-managment.module').then(m => m.MeetRequestManagmentModule)},

  {path:'profile/:id',loadChildren:()=>import('./views/suprivisor/suprivisor-profile/suprivisor-profile.module').then(m => m.SuprivisorProfileModule)},
  {path:'internsprogress/:id',loadChildren:()=>import('./views/suprivisor/intern-managment/intern-managment.module').then(m => m.InternManagmentModule)},
  {path:'addinternship/:id',loadChildren:()=>import('./views/suprivisor/add-internship/add-internship.module').then(m => m.AddInternshipModule)}

]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

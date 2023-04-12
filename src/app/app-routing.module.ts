import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { LandingpageLayoutComponent } from './layout/landingpage-layout/landingpage-layout.component';
import { AuthComponent } from './layout/auth/auth.component';

const routes: Routes = [{
  path: '', 
  component: LandingpageLayoutComponent
},

{path:'admin', component:AdminLayoutComponent,children:[
    {path: 'users',loadChildren: () => import('./views/admin/users/users.module').then(m => m.UsersModule)},
    {path: 'internships',loadChildren: () => import('./views/admin/internship/internship.module').then(m => m.InternshipModule)}

  ]
},
{path:'landingpage',component:LandingpageLayoutComponent,children:[
  {path:'home',loadChildren:()=>import('./views/preIntern/homepage/homepage.module').then(m => m.HomepageModule)},
  {path:'internshipdetails/:id',loadChildren:()=>import('./views/preIntern/internship-details/internship-details.module').then(m=> m.InternshipDetailsModule)},
  {path:'internshipapplication',loadChildren:()=>import('./views/preIntern/internship-application/internship-application.module').then(m=> m.InternshipApplicationModule)}

]},
{path:'auth',component:AuthComponent,children:[
  {path:'register',loadChildren:()=>import('./views/preIntern/register/register.module').then(m => m.RegisterModule)},
  {path:'login',loadChildren:()=>import('./views/login/login.module').then(m => m.LoginModule)}

]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AdminuserdashboardComponent } from './adminuserdashboard/adminuserdashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path:'about', component:AboutComponent },
  {
    path: 'login',
    component: LoginComponent,
    children: [{ path: 'register', component: RegisterComponent }],
  },

  { path: 'userdashboard', component: UserdashboardComponent },
  {
    path: 'adminuserdashboard',
    component: AdminuserdashboardComponent,
    children: [
      {
        path: 'addproduct',
        component: AddproductComponent,
      },
    ],
  },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

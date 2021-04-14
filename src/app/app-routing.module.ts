import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddproductComponent } from './admin/addproduct/addproduct.component';
import { AdminComponent } from './admin/admin.component';

import { CartComponent } from './user/cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { SearchComponent } from './search/search.component';
import { UserComponent } from './user/user.component';
import { EditproductComponent } from './admin/editproduct/editproduct.component';
import { UpdatepricesComponent } from './admin/updateprices/updateprices.component';
import { ProductdetailsComponent } from './products/productdetails/productdetails.component';
import { EditdetailsComponent } from './admin/editdetails/editdetails.component';
import { UserprofileComponent } from './user/userprofile/userprofile.component';
import { CheckoutComponent } from './user/cart/checkout/checkout.component';
import { PaymentComponent } from './user/cart/payment/payment.component';
import { AdminprofileComponent } from './admin/adminprofile/adminprofile.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'search', component: SearchComponent },
  { path: 'login', component: LoginComponent,
    children:[
      { path: 'register',component:RegisterComponent} 
    ] 
  },
  { path: 'user', component: UserComponent,
    children:[
      {path: 'home', component:HomeComponent},
      {path: 'cart',component:CartComponent},
      { path: 'about', component: AboutComponent },
      { path: 'search', component: SearchComponent },
      { path: 'productdetails/:id', component:ProductdetailsComponent},
      { path: 'userprofile', component:UserprofileComponent},
      { path: 'checkout', component: CheckoutComponent},
      { path: 'payment', component: PaymentComponent},
      { path: '', redirectTo:'user/home', pathMatch: 'prefix'}
    ]
  },
  { path: 'admin', component:AdminComponent,
    children:[
      {path: 'home', component:HomeComponent},
      {path: 'editproduct',component:EditproductComponent},
      {path: 'editdetails/:id',component:EditdetailsComponent},
      {path: 'updateprices',component:UpdatepricesComponent},
      {path: 'addproduct',component:AddproductComponent},
      { path: 'productdetails/:id', component:ProductdetailsComponent},
      { path: 'adminprofile', component: AdminprofileComponent},
      { path: '', redirectTo:'admin/home', pathMatch: 'prefix'}
    ]
  },
  { path: 'productdetails/:id', component:ProductdetailsComponent},
  { path: 'cart', component:CartComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled', useHash:true})],
  exports: [RouterModule],
})
export class AppRoutingModule { }

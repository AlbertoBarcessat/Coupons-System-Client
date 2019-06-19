import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyComponent } from './components/admin-components/add-company/add-company.component';
import { AddCustomerComponent } from './components/admin-components/add-customer/add-customer.component';
import { AdminComponent } from './components/admin-components/admin/admin.component';
import { UpdateCompanyComponent } from './components/admin-components/update-company/update-company.component';
import { UpdateCustomerComponent } from './components/admin-components/update-customer/update-customer.component';
import { CompanyComponent } from './components/company-components/company/company.component';
import { AddCouponComponent } from './components/coupon-components/add-coupon/add-coupon.component';
import { CouponDetailsComponent } from './components/coupon-components/coupon-details/coupon-details.component';
import { CustomerComponent } from './components/customer-components/customer/customer.component';
import { HomePageComponent } from './components/shared-components/home-page/home-page.component';
import { LoginComponent } from './components/shared-components/login/login.component';
import { Page404Component } from './components/shared-components/page404/page404.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'admin/:objectType', component: AdminComponent },
  { path: 'addCompany', component: AddCompanyComponent },
  { path: 'updateCompany', component: UpdateCompanyComponent },
  { path: 'addCustomer', component: AddCustomerComponent },
  { path: 'updateCustomer', component: UpdateCustomerComponent },
  { path: 'company/:id', component: CompanyComponent },
  { path: 'customer/:id', component: CustomerComponent },
  { path: 'couponDetails/:id', component: CouponDetailsComponent },
  { path: 'addCoupon', component: AddCouponComponent },
  { path: '**', component: Page404Component } // Not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

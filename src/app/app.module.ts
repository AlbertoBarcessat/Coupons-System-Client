import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AddCompanyComponent } from './components/admin-components/add-company/add-company.component';
import { AddCustomerComponent } from './components/admin-components/add-customer/add-customer.component';
import { AdminHeaderComponent } from './components/admin-components/admin-header/admin-header.component';
import { AdminComponent } from './components/admin-components/admin/admin.component';
import { CompaniesComponent } from './components/admin-components/companies/companies.component';
import { CustomersComponent } from './components/admin-components/customers/customers.component';
import { UpdateCompanyComponent } from './components/admin-components/update-company/update-company.component';
import { UpdateCustomerComponent } from './components/admin-components/update-customer/update-customer.component';
import { CompanyHeaderComponent } from './components/company-components/company-header/company-header.component';
import { CompanyComponent } from './components/company-components/company/company.component';
import { AddCouponComponent } from './components/coupon-components/add-coupon/add-coupon.component';
import { CouponDetailsComponent } from './components/coupon-components/coupon-details/coupon-details.component';
import { CouponsComponent } from './components/coupon-components/coupons/coupons.component';
import { CustomerHeaderComponent } from './components/customer-components/customer-header/customer-header.component';
import { CustomerComponent } from './components/customer-components/customer/customer.component';
import { HeaderComponent } from './components/shared-components/header/header.component';
import { HomePageComponent } from './components/shared-components/home-page/home-page.component';
import { LayoutComponent } from './components/shared-components/layout/layout.component';
import { LoginComponent } from './components/shared-components/login/login.component';
import { MainComponent } from './components/shared-components/main/main.component';
import { MessagesComponent } from './components/shared-components/messages/messages.component';
import { Page404Component } from './components/shared-components/page404/page404.component';
import { FooterComponent } from './components/shared-components/footer/footer.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    MainComponent,
    LoginComponent,
    AdminComponent,
    CompanyComponent,
    CustomerComponent,
    AdminHeaderComponent,
    CompaniesComponent,
    CustomersComponent,
    MessagesComponent,
    AddCompanyComponent,
    AddCustomerComponent,
    CompanyHeaderComponent,
    CouponsComponent,
    CouponDetailsComponent,
    AddCouponComponent,
    UpdateCustomerComponent,
    CustomerHeaderComponent,
    Page404Component,
    UpdateCompanyComponent,
    HomePageComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }

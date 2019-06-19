import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon';
import { CompanyService } from 'src/app/services/company.service';
import { CustomerService } from 'src/app/services/customer.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { ValidationService } from 'src/app/services/validation.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {
  public currentClientType = this.userService.clientType;
  public currentId = this.userService.id;
  public coupons: Coupon[] = [];
  public couponTypes: string[];
  public couponsFilterForm: FormGroup;
  public submitted = false;
  public filterTypes = ['Show All', 'Show by type', 'Show up to a price'];
  public allowPurchase = false; // Allow purchase only for customers
  public showPageMessage = true;
  public isCompany: boolean;
  public isCustomer: boolean;

  constructor(private formBuilder: FormBuilder, private companyService: CompanyService,
    private messageService: MessageService, private router: Router, private customerService: CustomerService,
    private validationService: ValidationService, private userService: UserService, public sharedService: SharedService) {
    this.couponsFilterForm = this.formBuilder.group({
      filterSelect: ['Show All'],
      couponTypeSelect: ['', [Validators.required]],
      priceSelect: ['', [Validators.required, Validators.pattern(validationService.getPricePattern())]],
      endDateSelect: ['', [Validators.required]]
    });
  }

  // If user represents a company, then allow filtering by end date
  ngOnInit() {
    this.messageService.clear();
    this.isCompany = this.userService.clientType === 'Company';
    this.isCustomer = this.userService.clientType === 'Customer';
    if (this.isCompany) {
      this.filterTypes.push('Show up to an end date');
    }
  }

  public onSubmit(): void {
    this.submitted = true;
  }

  /**
   * Don't check validators inmediatly after changing filter type
   */
  public onFilterChange(): void {
    this.submitted = false;
    this.couponsFilterForm.controls['couponTypeSelect'].setValue('');
  }

  /**
   * Shows coupons for company user
   */
  public showCoupons(): void {
    this.messageService.clear();
    this.showPageMessage = true;
    this.allowPurchase = false;
    if (this.isCompany) { // Only for companies
      switch (this.couponsFilterForm.controls['filterSelect'].value) {
        case 'Show All': // Show all company coupons
          this.companyService.getAllCoupons().subscribe(
            response => this.getResponse(response),
            error => this.messageService.handleError(error)
          );
          break;
        case 'Show by type': // Show all company coupons by type
          if (this.couponsFilterForm.controls['couponTypeSelect'].valid && this.couponsFilterForm.dirty) {
            this.companyService.getCouponsByType(this.couponsFilterForm.controls['couponTypeSelect'].value.toUpperCase())
              .subscribe(
                response => this.getResponse(response),
                error => this.messageService.handleError(error)
              );
          }
          break;
        case 'Show up to a price': // Show all company couponsup to a certain price
          if (this.couponsFilterForm.controls['priceSelect'].valid && this.couponsFilterForm.dirty) {
            this.companyService.getCouponsByPrice(this.couponsFilterForm.controls['priceSelect'].value)
              .subscribe(
                response => this.getResponse(response),
                error => this.messageService.handleError(error)
              );
          }
          break;
        case 'Show up to an end date': // Show all company couponsup to a certain end date
          if (this.couponsFilterForm.controls['endDateSelect'].valid && this.couponsFilterForm.dirty) {
            this.companyService.getCouponsByEndDate(this.couponsFilterForm.controls['endDateSelect'].value)
              .subscribe(
                response => this.getResponse(response),
                error => this.messageService.handleError(error)
              );
          }
      }
    }
  }

  /**
   * Shows purchase history for customer user
   */
  public showPurchaseHistory(): void {
    this.messageService.clear();
    this.showPageMessage = true;
    this.allowPurchase = false;
    if (this.isCustomer) { // Only for customers
      switch (this.couponsFilterForm.controls['filterSelect'].value) {
        case 'Show All': // Show all purchased coupons
          this.customerService.getAllPurchasedCoupons().subscribe(
            response => this.getResponse(response),
            error => this.messageService.handleError(error)
          );
          break;
        case 'Show by type': // Show all purchased coupons by type
          if (this.couponsFilterForm.controls['couponTypeSelect'].valid && this.couponsFilterForm.dirty) {
            this.customerService.getAllPurchasedCouponsbyType(this.couponsFilterForm.controls['couponTypeSelect'].value.toUpperCase())
              .subscribe(
                response => this.getResponse(response),
                error => this.messageService.handleError(error)
              );
          }
          break;
        case 'Show up to a price': // Show all purchased coupons up to a certain price
          if (this.couponsFilterForm.controls['priceSelect'].valid && this.couponsFilterForm.dirty) {

            this.customerService.getAllPurchasedCouponsByPrice(this.couponsFilterForm.controls['priceSelect'].value)
              .subscribe(
                response => this.getResponse(response),
                error => this.messageService.handleError(error)
              );
          }
      }
    }
  }

  /**
   * Shows all coupons in system for customer
   */
  public showAllCoupons(): void {
    this.messageService.clear();
    this.showPageMessage = true;
    this.allowPurchase = true;
    if (this.isCustomer) { // Only for customers
      this.customerService.getAllCoupons().subscribe(
        response => this.getResponse(response),
        error => this.messageService.handleError(error)
      );
    }
  }

  /**
   * Navigates to add coupon
   */
  public addCoupon(): void {
    this.messageService.clear();
    this.router.navigate(['addCoupon']);
  }

  /**
   * Sets message 'No coupon found' if necessary
   * @param response Response from http - a list of coupons
   */
  public getResponse(response: any): void {
    this.coupons = response;
    if (this.coupons.length === 0) {
      this.messageService.add('No coupons found');
    } else {
      this.showPageMessage = false;
    }
  }

}

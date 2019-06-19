import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Coupon } from 'src/app/models/coupon';
import { CompanyService } from 'src/app/services/company.service';
import { CustomerService } from 'src/app/services/customer.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-coupon-details',
  templateUrl: './coupon-details.component.html',
  styleUrls: ['./coupon-details.component.css']
})
export class CouponDetailsComponent implements OnInit {
  // Coupon to be displayed
  @Input() coupon: Coupon;
  // Indication about allowing purchase, for customer client only
  @Input() allowPurchase: boolean;

  public Id: number;
  public couponForm: FormGroup;
  public submitted = false;
  public currentId = this.userService.id;
  public onUpdate = false;
  public onRemove = false;
  public imageFolder = '/assets/images/';
  public isCompany: boolean;
  public isCustomer: boolean;

  constructor(private formBuilder: FormBuilder, private companyService: CompanyService,
    private customerService: CustomerService, private userService: UserService,
    private messageService: MessageService, private validationService: ValidationService) {

    this.couponForm = this.formBuilder.group({
      price: ['', [Validators.required, Validators.pattern(validationService.getPricePattern())]],
      endDate: ['', Validators.required]
    }, {
        validator: this.validationService.validDate('endDate')
      });
  }

  // Gets coupon types and initiate values, sets image folder, sets couponType to lowercase except first letter
  ngOnInit() {
    this.isCompany = this.userService.clientType === 'Company';
    this.isCustomer = this.userService.clientType === 'Customer';
    this.coupon.image = this.imageFolder + this.coupon.image;
    this.coupon.couponType = this.coupon.couponType.charAt(0) + this.coupon.couponType.slice(1).toLowerCase();
    this.setInitialValues();
  }

  /**
   * Initiates values, disables update as default
   */
  public setInitialValues(): void {
    this.messageService.clear();
    this.couponForm.get('price').setValue(this.coupon.price);
    this.couponForm.get('endDate').setValue(this.coupon.endDate);
    this.couponForm.get('price').disable();
    this.couponForm.get('endDate').disable();
  }

  public onSubmit(): void {
    this.submitted = true;
  }

  /**
   * Purchases a coupon after checking validity of amount and date
   * @param coupon Coupon to be purchased
   */
  public purchaseCoupon(): void {
    this.messageService.clear();
    if (this.coupon.amount <= 0) {
      this.messageService.add('Can\'t purchase coupon out of stock');
    } else if (this.couponForm.controls['endDate'].value < new Date()) {
      this.messageService.add('Can\'t purchase coupon out of date');
    } else {
      this.customerService.purchaseCoupon(this.coupon.couponId).subscribe(
        () => this.messageService.add('The coupon was purchased'),
        error => this.messageService.handleError(error));
    }
  }

  /**
   *  Enables editing to update a coupon
   * @param coupon Coupon to be updated
   */
  public updateCoupon(): void {
    this.messageService.clear();
    if (this.isCompany) { // Only a company users can update a coupon
      this.couponForm.get('price').enable();
      this.couponForm.get('endDate').enable();
      this.onUpdate = true;
    }
  }

  /**
   * Saves update changes
   */
  public saveUpdate(): void {
    if (!this.couponForm.dirty) {
      this.messageService.add('Nothing to save, No value was updated');
      this.onUpdate = false;
      return;
    }
    if (this.couponForm.valid && this.couponForm.dirty) {
      this.coupon.endDate = this.couponForm.controls['endDate'].value;
      this.coupon.price = this.couponForm.controls['price'].value;
      this.coupon.couponType = this.coupon.couponType.toUpperCase();
      this.companyService.updateCoupon(this.coupon).subscribe(
        () => {
          this.messageService.add('The coupon was updated');
          this.onUpdate = false;
        },
        error => this.messageService.handleError(error));
    }
  }

  /**
   * Cancels update of coupon
   */
  public cancelUpdate(): void {
    this.setInitialValues();
    this.onUpdate = false;
    this.Id = null;
  }

  /**
   * Removes a coupon
   * @param coupon Coupon to be removed
   */
  public removeCoupon(): void {
    this.messageService.clear();
    if (this.isCompany) { // Only company users can remove a coupon
      this.onRemove = true;
    }
  }

  /**
   * Confirms remove of coupon
   */
  public confirmRemove(): void {
    this.companyService.removeCoupon(this.coupon.couponId).subscribe(
      () => {
        this.messageService.add('The coupon was removed');
        this.coupon = null;
        this.onRemove = false;
      },
      error => this.messageService.handleError(error));
  }

  /**
   * Cancels remove of coupon
   */
  public cancelRemove(): void {
    this.messageService.clear();
    this.onRemove = false;
    this.Id = null;
  }

  /**
   * Goes back to top of page
   */
  public backToTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

}

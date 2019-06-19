import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon';
import { CompanyService } from 'src/app/services/company.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';
import { ValidationService } from 'src/app/services/validation.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {
  public addCouponForm: FormGroup;
  public submitted = false;
  public currentClientType = this.userService.clientType;
  public currentId = this.userService.id;

  constructor(private formBuilder: FormBuilder, private companyService: CompanyService,
    private messageService: MessageService, private router: Router,
    private validationService: ValidationService, private userService: UserService,
    public sharedService: SharedService) {

    this.addCouponForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      type: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(validationService.getPricePattern())]],
      endDate: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(validationService.getAmountPattern())]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      image: ['', [Validators.required, Validators.maxLength(40), Validators.pattern(validationService.getImagePattern())]]
    }, {
        validator: this.validationService.validDate('endDate')
      });
  }

  // Checks if user is logged in
  ngOnInit() {
    this.messageService.clear();
    if (this.userService.clientType === '') {
      this.userService.logout().subscribe(
        () => {
          this.messageService.add('Please login in order to continue');
          this.router.navigate(['login']);
        },
        error => this.messageService.handleError(error));
    }
  }

  public onSubmit(): void {
    this.submitted = true;
  }

  /**
   *  Adds a coupon
   */
  public addCoupon(): void {
    if (this.addCouponForm.valid && this.addCouponForm.dirty) {
      const title = this.addCouponForm.controls['title'].value;
      const message = this.addCouponForm.controls['message'].value;
      const fullImage = this.addCouponForm.controls['image'].value;
      const image = fullImage.substring(fullImage.lastIndexOf('\\') + 1, fullImage.length);
      const startDate = new Date();
      const endDate = this.addCouponForm.controls['endDate'].value;
      const amount = this.addCouponForm.controls['amount'].value;
      const type = this.addCouponForm.controls['type'].value.toUpperCase();
      const price = this.addCouponForm.controls['price'].value;
      if (this.currentClientType === 'Company') { // Only companies can add a coupon
        this.companyService.createCoupon(new Coupon(0, title, message, image, startDate,
          endDate, amount, type, price)).subscribe(
            () => this.messageService.add('The coupon was added'),
            error => this.messageService.handleError(error));
      }
    }
  }

  /**
   * Goes back to coupons screen for company or customer
   */
  public back(): void {
    this.messageService.clear();
    switch (this.currentClientType) {
      case 'Company':
        this.router.navigate(['company/' + this.currentId]);
        break;
      case 'Customer':
        this.router.navigate(['customer/' + this.currentId]);
        break;
      default:
        this.messageService.add('Navigation error, please login again');
    }
  }

}

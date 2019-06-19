import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
    // Customer to be updated
  @Input() customer: Customer; 
  // Cancel event
  @Output() onCancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  public updateCustomerForm: FormGroup;
  public submitted = false;

  constructor(private formBuilder: FormBuilder, private adminService: AdminService,
    private messageService: MessageService, private router: Router) {
    this.updateCustomerForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]]
    });
  }

  // Gets updated values before saving
  ngOnInit() {
    this.messageService.clear();
    this.updateCustomerForm.get('password').setValue(this.customer.password);
  }

  public onSubmit(): void {
    this.submitted = true;
  }

  /**
 * Saves an updated customer
 * @param customer Customer to be saved
 */
  public saveCustomer(customer: Customer): void {
    if (!this.updateCustomerForm.dirty) {
      this.messageService.add('Nothing to save, No value was updated');
      return;
    }
    if (this.updateCustomerForm.valid && this.updateCustomerForm.dirty) {
      this.messageService.clear();
      customer.custName = this.customer.custName;
      customer.password = this.updateCustomerForm.controls['password'].value;
      this.adminService.updateCustomer(customer).subscribe(
        () => {
          this.messageService.add('The customer was updated');
          this.onCancel.emit(true);
        },
        error => this.messageService.handleError(error));
    }
  }

  /**
 * Cancels saving of customer
 */
  public cancel(): void {
    this.messageService.clear();
    this.onCancel.emit(true);
  }

}


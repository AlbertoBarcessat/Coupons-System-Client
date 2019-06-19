import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { AdminService } from 'src/app/services/admin.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
 /**
 * Adds a new company
 */
export class AddCustomerComponent implements OnInit {
  public addCustomerForm: FormGroup;
  public submitted = false;

  constructor(private formBuilder: FormBuilder, private adminService: AdminService,
    private messageService: MessageService, private router: Router, public userService: UserService) {
    this.addCustomerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
    });
  }

  // Checks if user is logged in
  ngOnInit() {
  if (this.userService.clientType === '') {
    this.userService.logout().subscribe(
      () => {
        this.messageService.add('Please login in order to continue');
        this.router.navigate(['login']);
      },
      error => this.messageService.handleError(error));
  }
}

  /**
   * Sets submitted form as true
   */
  public onSubmit(): void {
    this.submitted = true;
  }

  /**
  * Adds a new customer from form using addCustomer service and sets appropriate message to user
  */
  public addCustomer(): void {
    this.messageService.clear();
    if (this.addCustomerForm.valid && this.addCustomerForm.dirty) {
      const name = this.addCustomerForm.controls['name'].value;
      const password = this.addCustomerForm.controls['password'].value;
      this.adminService.addCustomer(new Customer(0, name, password, [])).subscribe(
        () => this.messageService.add('The customer was added'),
        error => this.messageService.handleError(error)
        );
    }
  }

 /**
 * Goes back to customers form after pressing back button
 */
  public back(): void {
    this.router.navigate(['admin/customers']);
  }

}

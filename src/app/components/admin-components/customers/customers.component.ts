import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { AdminService } from 'src/app/services/admin.service';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  selectedCustomer: Customer;
  updateOn = false;

  constructor(private adminService: AdminService, private messageService: MessageService,
    private router: Router) {
  }

  // Sets companies to be displayed using getAllCustomers service and sets appropriate message to user
  ngOnInit() {
    this.messageService.clear();
    this.adminService.getAllCustomers().subscribe(
      response => {
        this.customers = response;
          if (this.customers.length === 0) {
            this.customers = null;
            this.messageService.add('No customers found');
          }
        },
      error => this.messageService.handleError(error));
  }

    /**
   * Changes state to update a customer
   * @param customer Customer to be updated
   */
  public updateCustomer(customer: Customer): void {
    this.messageService.clear();
    this.selectedCustomer = customer;
    this.updateOn = true;
  }

    /**
   * Removes a customer using removeCustomer service and sets appropriate message to user
   * @param customer Customer to be removed
   */
  public removeCustomer(customer: Customer): void {
    this.messageService.clear();
    this.selectedCustomer = customer;
    this.adminService.removeCustomer(customer.customerId).subscribe(
      () => {
        this.messageService.add('The customer was removed');
        const index = this.customers.indexOf(customer);
        if (index !== -1) {
          this.customers.splice(index, 1);
        }
      },
      error => this.messageService.handleError(error));
  }

    /**
    * Navigate to add a customer
    */
  public addCustomer(): void {
    this.messageService.clear();
    this.router.navigate(['addCustomer']);
  }

    /**
   * Cancels update state
   */
  public cancel(): void {
    this.updateOn = false;
  }

  /**
   * Goes back to top of page
   */
  public backToTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}

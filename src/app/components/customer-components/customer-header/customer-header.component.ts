import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.css']
})
export class CustomerHeaderComponent implements OnInit {
  public customer: Customer;

  constructor(private customerService: CustomerService, private messageService: MessageService) { }

  // Gets customer data
  ngOnInit() {
    this.customerService.getCustomer().subscribe(
    response => this.customer = response,
    error => this.messageService.handleError(error));
  }

}

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
/**
 * Header of admin
 */
export class AdminHeaderComponent {
  // Output Type of object: Company or customer
  @Output() onObjectTypeSelect: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Emits users choice to show companies
   */
  public showCompanies(): void {
    this.onObjectTypeSelect.emit('companies');
  }

  /**
 * Emits users choice to show customers
 */
  public showCustomers(): void {
    this.onObjectTypeSelect.emit('customers');
  }

}

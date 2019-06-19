import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company';
import { Customer } from '../models/customer';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for admin clients
 */
export class AdminService {
  private ADMIN_URL = this.dataService.getBaseUrl() + 'rest/admin/';

  constructor(private httpService: HttpClient, private dataService: DataService) {
  }

  /**
   * Updates a company using put HTTP service
   * @param company Company to be updated
   */
  public updateCompany(company: Company): Observable<void> {
    const url = this.ADMIN_URL + 'company/' + company.companyId;
    return this.httpService.put<void>(url, company, { withCredentials: true });
  }

  /**
   * Removes a company using delete HTTP service
   * @param companyID Id of company to be removed
   */
  public removeCompany(companyID: number): Observable<void> {
    const url = this.ADMIN_URL + 'company/' + companyID;
    return this.httpService.delete<void>(url, { withCredentials: true });
  }

  /**
   * Adds a company using post HTTP service
   * @param company Company to be added
   * @returns Company added
   */
  public addCompany(company: Company): Observable<Company> {
    const url = this.ADMIN_URL + 'company';
    return this.httpService.post<Company>(url, company, { withCredentials: true });
  }

  /**
   * Gets all companies using get HTTP
   * @returns List of all companies
   */
  public getAllCompanies(): Observable<Company[]> {
    const url = this.ADMIN_URL + 'company';
    return this.httpService.get<Company[]>(url, { withCredentials: true });
  }

  /**
  * Updates a customer using put HTTP service
  * @param customer Customer to be updated
  */
  public updateCustomer(customer: Customer): Observable<void> {
    const url = this.ADMIN_URL + 'customer/' + customer.customerId;
    return this.httpService.put<void>(url, customer, { withCredentials: true });
  }

  /**
  * Removes a customer using delete HTTP service
  * @param customerID Id of customer to be removed
  */
  public removeCustomer(customerID: number): Observable<void> {
    const url = this.ADMIN_URL + 'customer/' + customerID;
    return this.httpService.delete<void>(url, { withCredentials: true });
  }

  /**
  * Adds a customer using post HTTP service
  * @param customer Customer to be added
  * @returns Customer added
  */
  public addCustomer(customer: Customer): Observable<Customer> {
    const url = this.ADMIN_URL + 'customer';
    return this.httpService.post<Customer>(url, customer, { withCredentials: true });
  }

  /**
  * Gets all customers using get HTTP
  * @returns List of all customers
  */
  public getAllCustomers(): Observable<Customer[]> {
    const url = this.ADMIN_URL + 'customer';
    return this.httpService.get<Customer[]>(url, { withCredentials: true });
  }

}

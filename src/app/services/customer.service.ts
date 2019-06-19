import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from '../models/coupon';
import { Customer } from '../models/customer';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
/**
* Service for customer clients
*/
export class CustomerService {
  private CUSTOMER_URL = this.dataService.getBaseUrl() + 'rest/customer/';

  constructor(private httpService: HttpClient, private dataService: DataService) { }

  /**
   * Purchases a coupon for current customer using get HTTP service
   * @param couponId Id of coupon to be purchased
   */
  public purchaseCoupon(couponId: number): Observable<void> {
    const url = this.CUSTOMER_URL + 'purchaseCoupon/' + couponId;
    return this.httpService.get<void>(url, { withCredentials: true });
  }

  /**
   * Gets all coupons in the system using get HTTP service
   * @returns List of all coupons
   */
  public getAllCoupons(): Observable<Coupon[]> {
    const url = this.CUSTOMER_URL + 'allCoupons';
    return this.httpService.get<Coupon[]>(url, { withCredentials: true });
  }

  /**
   * Gets all purchased coupons by current customer using get HTTP service
   * @returns List of purchased coupons
   */
  public getAllPurchasedCoupons(): Observable<Coupon[]> {
    const url = this.CUSTOMER_URL + 'couponsPurchased';
    return this.httpService.get<Coupon[]>(url, { withCredentials: true });
  }

  /**
  * Gets all purchased coupons by current customer by a certain type using get HTTP service
  *  @returns List of purchased coupons
  */
  public getAllPurchasedCouponsbyType(couponType: string): Observable<Coupon[]> {
    const url = this.CUSTOMER_URL + 'couponsByType/' + couponType;
    return this.httpService.get<Coupon[]>(url, { withCredentials: true });
  }

  /**
  * Gets all purchased coupons by current customer up to a certain price using get HTTP service
  * @returns List of purchased coupons
  */
  public getAllPurchasedCouponsByPrice(price: number): Observable<Coupon[]> {
    const url = this.CUSTOMER_URL + 'couponsByPrice/' + price;
    return this.httpService.get<Coupon[]>(url, { withCredentials: true });
  }

  /**
  * Gets current customer data using get HTTP service
  *  @returns Customer required
  */
  public getCustomer(): Observable<Customer> {
    const url = this.CUSTOMER_URL + 'customer';
    return this.httpService.get<Customer>(url, { withCredentials: true });
    }

}

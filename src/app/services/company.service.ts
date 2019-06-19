import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company';
import { Coupon } from '../models/coupon';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
/**
* Service for admin clients
*/
export class CompanyService {
  private COMPANY_URL = this.dataService.getBaseUrl() + 'rest/company/';

  constructor(private httpService: HttpClient, private dataService: DataService) { }

  /**
  * Updates a coupon using put HTTP service
  * @param coupon Coupon to be updated
  */
  public updateCoupon(coupon: Coupon): Observable<void> {
    const url = this.COMPANY_URL + 'coupon/' + coupon.couponId;
    return this.httpService.put<void>(url, coupon, { withCredentials: true });
  }

  /**
  * Removes a coupon using delete HTTP service
  * @param couponID Id of coupon to be removed
  */
  public removeCoupon(couponID: number): Observable<void> {
    const url = this.COMPANY_URL + 'coupon/' + couponID;
    return this.httpService.delete<void>(url, { withCredentials: true });
  }

  /**
  * Creates a coupon using post HTTP service
  * @param coupon Coupon to be created
  * @returns Coupon created
  */
  public createCoupon(coupon: Coupon): Observable<Coupon> {
    const url = this.COMPANY_URL + 'coupon';
    return this.httpService.post<Coupon>(url, coupon, { withCredentials: true });
  }

  /**
  * Gets all coupons of current company using get HTTP service
  * @returns All company coupons
  */
  public getAllCoupons(): Observable<Coupon[]> {
    const url = this.COMPANY_URL + 'coupon';
    return this.httpService.get<Coupon[]>(url, { withCredentials: true });
  }

  /**
  * Gets all coupons of current company by a certain type using get HTTP service
  * @returns All company coupons by a certain type
  */
  public getCouponsByType(couponType: string): Observable<Coupon[]> {
    const url = this.COMPANY_URL + 'couponsByType/' + couponType;
    return this.httpService.get<Coupon[]>(url, { withCredentials: true });
  }

  /**
  * Gets all coupons of current company up to a certain price using get HTTP service
  * @returns All company coupons up to a certain price
  */
  public getCouponsByPrice(price: number): Observable<Coupon[]> {
    const url = this.COMPANY_URL + 'couponsByPrice/' + price;
    return this.httpService.get<Coupon[]>(url, { withCredentials: true });
  }

  /**
  * Gets all coupons of current company up to a certain end date using get HTTP service
  * @returns All company coupons up to a certain end date
  */
  public getCouponsByEndDate(endDate: Date): Observable<Coupon[]> {
    const url = this.COMPANY_URL + 'couponsByEndDate/' + endDate;
    return this.httpService.get<Coupon[]>(url, { withCredentials: true });
  }

  /**
  * Gets current company data using get HTTP service
  * @returns Company required
  */
  public getCompany(): Observable<Company> {
    const url = this.COMPANY_URL + 'company';
    return this.httpService.get<Company>(url, { withCredentials: true });
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for shared operations
 */
export class SharedService {
  private SHARED_URL = this.dataService.getBaseUrl() + 'rest/shared/';
  private couponTypes: string[] = [];

  constructor(private httpService: HttpClient, private dataService: DataService,
    private messageService: MessageService) { }

  /**
 * Gets a list of coupon types only once
 * @returns List of coupon types
 */
  public getOnceCouponTypes(): string[] {
    if (this.couponTypes.length === 0) { // First time get from service
      this.getCouponTypes().subscribe(
        response => this.changeCapitalLetters(response),
        error => this.messageService.handleError(error));
    }
    return this.couponTypes; // Next times get from previous fetch
  }

  /**
  * Gets a list of coupon types in system
  * @returns List of coupon types
  */
 private getCouponTypes(): Observable<string[]> {
  const url = this.SHARED_URL + 'couponTypes';
  return this.httpService.get<string[]>(url, { withCredentials: true });
}

  /**
   * Changes capital letters to lowercase except first letter
   * @param types List of types to change
   */
  private changeCapitalLetters(types: string[]): void {
    types.forEach(couponType => {
      this.couponTypes.push(couponType.charAt(0) + couponType.slice(1).toLowerCase());
    });
    this.couponTypes = Array.from(new Set(this.couponTypes)); // Eliminate duplicate values
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private BASE_URL = 'http://localhost:8080/coupons/';

  /**
   * Gets base Url for all HTTP calls
   */
  public getBaseUrl() {
    return this.BASE_URL;
  }

}

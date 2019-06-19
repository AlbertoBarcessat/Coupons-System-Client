import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
* Service for client types
*/
export class ClientTypeService {

  /**
   * Gets clients types
   */
  public getclientTypes(): string[] {
    return ['Administrator', 'Company', 'Customer'];
  }
}

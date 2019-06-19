import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for shared validations
 */
export class ValidationService {
  // Validates positive price for price
  private PRICE_REGEX_PATTERN = '^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$';
  // Validates positive and integer number for amount
  private AMOUNT_REGEX_PATTERN = '^[1-9][0-9]*$';
  // Validates image format
  private IMAGE_REGEX_PATTERN = '^.+\.(png|jpg|jpeg|gif|webp|PNG|JPG|JPEG|GIF|WEBP)$';

  /**
   * Checks that end date is a future or present date
   * @param controlName name of control to validate
   */
  public validDate(controlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      if (control.errors && !control.errors.validDate) {
        return;
      }
      // compare date portion only
      if (new Date(control.value) < new Date(new Date().toDateString())) {
        control.setErrors({ validDate: true });
      } else {
        control.setErrors(null);
      }
    };
  }

  /**
   * Gets pattern to valdidate a price
   */
  public getPricePattern(): string {
    return this.PRICE_REGEX_PATTERN;
  }

  /**
   * Gets pattern to valdidate an amount
   */
  public getAmountPattern(): string {
    return this.AMOUNT_REGEX_PATTERN;
  }

  /**
   * Gets pattern to valdidate an image
   */
  public getImagePattern(): string {
    return this.IMAGE_REGEX_PATTERN;
  }
}

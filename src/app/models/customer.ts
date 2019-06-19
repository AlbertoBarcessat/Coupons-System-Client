import { Coupon } from './coupon';

/**
 * Represents a customer
 */
export class Customer {
    constructor(
        public customerId: number,
        public custName: string,
        public password: string,
        public coupons: Coupon[]
    ) {
    }
}
import { Coupon } from './coupon';

/**
 * Represents a company
 */
export class Company {
    constructor(
        public companyId: number,
        public companyName: string,
        public password: string,
        public email: string,
        public coupons: Coupon[]
    ) {
    }
}

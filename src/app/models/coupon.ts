/**
 * Represents a coupon
 */
export class Coupon {
    constructor(
        public couponId: number,
        public title: string,
        public message: string,
        public image: string,
        public startDate: Date,
        public endDate: Date,
        public amount: number,
        public couponType: string,
        public price: number
    ) {
    }
}

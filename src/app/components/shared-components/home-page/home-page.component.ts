import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  public imageFolder = '/assets/internal/';
  public adminImage = this.imageFolder + 'admin.PNG';
  public companyImage = this.imageFolder + 'company.PNG';
  public customerImage = this.imageFolder + 'customer.PNG';
  public couponsImage = this.imageFolder + 'coupons.gif';

}

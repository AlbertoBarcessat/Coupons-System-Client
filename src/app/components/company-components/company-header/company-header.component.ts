import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-company-header',
  templateUrl: './company-header.component.html',
  styleUrls: ['./company-header.component.css']
})
export class CompanyHeaderComponent implements OnInit {
  public company: Company;

  constructor(private companyService: CompanyService, private messageService: MessageService) { }

  // Gets company data
  ngOnInit() {
    this.companyService.getCompany().subscribe(
      (response) => this.company = response,
      error => this.messageService.handleError(error));
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { AdminService } from 'src/app/services/admin.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
/**
 * Show companies
 */
export class CompaniesComponent implements OnInit {
  public companies: Company[] = [];
  public selectedCompany: Company;
  public updateOn = false;

  constructor(private adminService: AdminService, private messageService: MessageService,
    private router: Router) {
  }

  // Sets companies to be displayed using getAllCompanies service and sets appropriate message to user
  ngOnInit() {
    this.messageService.clear();
    this.adminService.getAllCompanies().subscribe(
      response => {
      this.companies = response;
        if (this.companies.length === 0) {
          this.companies = null;
          this.messageService.add('No companies found');
        }
      },
      error => this.messageService.handleError(error)
    );
  }

  /**
   * Changes state to update a company
   * @param company Company to be updated
   */
  public updateCompany(company: Company): void {
    this.messageService.clear();
    this.selectedCompany = company;
    this.updateOn = true;
  }

  /**
   * Removes a company using removeCompany service and sets appropriate message to user
   * @param company Company to be removed
   */
  public removeCompany(company: Company): void {
    this.messageService.clear();
    this.selectedCompany = company;
    this.adminService.removeCompany(company.companyId).subscribe(
      () => {
        this.messageService.add('The company was removed');
        const index = this.companies.indexOf(company);
        if (index !== -1) {
          this.companies.splice(index, 1);
        }
      },
      error => this.messageService.handleError(error));
  }

  /**
    * Navigate to add a company
    */
  public addCompany(): void {
    this.messageService.clear();
    this.router.navigate(['addCompany']);
  }

  /**
   * Cancels update state
   */
  public cancel(): void {
    this.updateOn = false;
  }

  /**
   * Goes back to top of page
   */
  public backToTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}

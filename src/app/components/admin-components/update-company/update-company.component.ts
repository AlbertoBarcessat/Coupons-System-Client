import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Company } from 'src/app/models/company';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit {
  // Company to be updated
  @Input() company: Company;
  // Cancel event
  @Output() onCancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  public updateCompanyForm: FormGroup;
  public submitted = false;

  constructor(private formBuilder: FormBuilder, private adminService: AdminService,
    private messageService: MessageService, private router: Router) {
    this.updateCompanyForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(40)]]
    });
  }

  // Gets updated values before saving
  ngOnInit() {
    this.messageService.clear();
    this.updateCompanyForm.get('password').setValue(this.company.password);
    this.updateCompanyForm.get('email').setValue(this.company.email);
  }

  public onSubmit(): void {
    this.submitted = true;
  }

  /**
   * Saves an updated company
   * @param company Company to be saved
   */
  public saveCompany(company: Company): void {
    if (!this.updateCompanyForm.dirty) {
      this.messageService.add('Nothing to save, No value was updated');
      return;
    }
    if (this.updateCompanyForm.valid && this.updateCompanyForm.dirty) {
      this.messageService.clear();
      company.companyName = this.company.companyName;
      company.password = this.updateCompanyForm.controls['password'].value;
      company.email = this.updateCompanyForm.controls['email'].value;
      this.adminService.updateCompany(company).subscribe(
        () => {
          this.messageService.add('The company was updated');
          this.onCancel.emit(true);
        },
        error => this.messageService.handleError(error));
    }
  }

  /**
   * Cancels saving of company
   */
  public cancel(): void {
    this.messageService.clear();
    this.onCancel.emit(true);
  }

}


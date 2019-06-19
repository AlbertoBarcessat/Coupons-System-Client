import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { AdminService } from 'src/app/services/admin.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
/**
 * Adds a new company
 */
export class AddCompanyComponent implements OnInit {
  public addCompanyForm: FormGroup;
  public submitted = false;

  constructor(private formBuilder: FormBuilder, private adminService: AdminService,
    private messageService: MessageService, private router: Router, public userService: UserService) {
    this.addCompanyForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(40)]]
    });
  }

  // Checks if user is logged in
  ngOnInit() {
    if (this.userService.clientType === '') {
      this.userService.logout().subscribe(
        () => {
          this.messageService.add('Please login in order to continue');
          this.router.navigate(['login']);
        },
        error => this.messageService.handleError(error));
    }
  }

  /**
   * Sets submitted form as true
   */
  public onSubmit(): void {
    this.submitted = true;
  }

  /**
   * Adds a new company from form using addCompany service and sets appropriate message to user
   */
  public addCompany(): void {
    this.messageService.clear();
    if (this.addCompanyForm.valid && this.addCompanyForm.dirty) {
      const name = this.addCompanyForm.controls['name'].value;
      const password = this.addCompanyForm.controls['password'].value;
      const email = this.addCompanyForm.controls['email'].value;
      this.adminService.addCompany(new Company(0, name, password, email, [])).subscribe(
        () => this.messageService.add('The company was added'),
        error => this.messageService.handleError(error)
      );
    }
  }

  /**
   * Goes back to companies form after pressing back button
   */
  public back(): void {
    this.router.navigate(['admin/companies']);
  }

}

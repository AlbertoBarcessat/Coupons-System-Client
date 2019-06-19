import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ClientTypeService } from 'src/app/services/client-type.service';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm: FormGroup;
  public submitted = false;
  public clientTypes = [];

  constructor(private formBuilder: FormBuilder, private clientTypeService: ClientTypeService,
    private userService: UserService, private messageService: MessageService,
    private router: Router) {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      clientType: ['Administrator', [Validators.required]]
    });
    this.clientTypes = clientTypeService.getclientTypes();
  }

  public onSubmit(): void {
    this.submitted = true;
  }

  /**
   * Logins into system by name, password and client type
   */
  public login(): void {
    this.messageService.clear();
    if (this.loginForm.valid && this.loginForm.dirty) {
      const name = this.loginForm.controls['name'].value;
      const password = this.loginForm.controls['password'].value;
      const clientType = this.loginForm.controls['clientType'].value;
      this.userService.login(new User(name, password, clientType.toUpperCase())).subscribe(
        (id) => {
          this.userService.clientType = clientType;
          this.userService.id = id;
          switch (clientType) {
            case 'Administrator':
              this.router.navigate(['/admin/all']);
              break;
            case 'Company':
              this.router.navigate(['/company/' + id]);
              break;
            case 'Customer':
              this.router.navigate(['/customer/' + id]);
              break;
            default:
              this.messageService.add('Please choose a valid client type from the list');
          }
        },
        error => this.messageService.handleError(error));
    }
  }

}

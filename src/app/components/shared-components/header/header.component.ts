import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public showHome = false;
  public showLogin = true;

  constructor(public userService: UserService, private router: Router,
    private messageService: MessageService) { }

  /**
   * Navigate to home page
   */
  public home(): void {
    this.messageService.clear();
    this.showHome = false;
    this.showLogin = true;
    this.router.navigate(['home']);
  }

  /**
   * Navigate to login page
   */
  public login(): void {
    this.messageService.clear();
    this.showLogin = false;
    this.showHome = true;
    this.router.navigate(['login']);
  }

  /**
   * Logout from system and navigate to home page
   */
  public logout(): void {
    this.userService.logout().subscribe(
      () => {
        this.userService.clientType = '';
        this.userService.id = -1;
        this.messageService.add('User successfully logged out');
        this.router.navigate(['login']);
      },
      error => this.messageService.handleError(error));
  }

}

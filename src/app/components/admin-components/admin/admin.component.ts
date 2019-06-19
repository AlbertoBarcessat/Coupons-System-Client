import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
/**
 * Admin form for displaying companies or customers
 */
export class AdminComponent implements OnInit {
  public objectType = '';

  constructor(private route: ActivatedRoute, public userService: UserService,
     private messageService: MessageService, private router: Router) { }

  // Checks if user is logged in and gets object type from route parameter
  ngOnInit() {
    if (this.userService.clientType === '') {
      this.userService.logout().subscribe(
        () => {
          this.messageService.add('Please login in order to continue');
          this.router.navigate(['login']);
        },
        error => this.messageService.handleError(error));
    }
    this.route.params.subscribe(params => this.objectType = params.objectType);
  }

  /**
   * Sets object type to be displayed
   * @param objectType type of object to be displayed: Companies or customers object type
   */
  public updateObjectType(objectType: string): void {
    this.objectType = objectType;
  }

}

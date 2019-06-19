import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for dealing with user displayed messages
 */
export class MessageService {
  private messages: string[] = [];

  constructor(private router: Router) { }

  /**
   * Adds a new message to array of messages
   * @param message Message to be added
   */
  add(message: string): void {
    this.clear();
    this.messages.push(message);
  }

  /**
   * Gets all messages in array
   */
  get(): string[] {
    return this.messages;
  }

  /**
   * Clear current user messages
   */
  clear(): void {
    this.messages = [];
  }

  /**
   * Handle errors in http calls
   * @param error error got from http call to be handled
   */
  public handleError(error: any): void {
    this.clear();
    if (error.error instanceof ProgressEvent) { // System error, e.g. server is down
      this.add(error.statusText);
      this.router.navigate(['login']);
    } else {
      const status = error.error.status;
      if (status === 408 || status === 401 || status === 401) { // Error from filter
        this.add(error.error.message);
        this.router.navigate(['login']);
      } else { // Application error
        this.add(error.error.errorText);
        if (error.error.errorMessages != null) { // add messages from array
          error.error.errorMessages.forEach((element: string) => {
            this.add(element);
          });
        }
      }
    }

  }

}

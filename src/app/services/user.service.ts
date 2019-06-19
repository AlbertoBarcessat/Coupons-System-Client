import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for client user
 */
export class UserService {
  private USER_URL = this.dataService.getBaseUrl() + 'user/';
  private currentClientType = ''; // current client type logged in
  private currentId = -1; // current id logged in

  constructor(private httpService: HttpClient, private dataService: DataService) { }

  /**
   * Logins with user credentials using post HTTP service
   * @param user User to login
   */
  public login(user: User): Observable<number> {
    const url = this.USER_URL + 'login';
    return this.httpService.post<number>(url, user, { withCredentials: true });
  }

  /**
   * Logouts current user
   */
  public logout(): Observable<void> {
    const url = this.USER_URL + 'logout';
    return this.httpService.get<void>(url, { withCredentials: true });
  }

  /**
   * Sets current client type
   *  @param type Client type to be set
   */
  public set clientType(type: string) {
    this.currentClientType = type;
  }

  /**
   * Gets current client type
   */
  public get clientType(): string {
    return this.currentClientType;
  }

  /**
   * Sets current client id
   * @param id Id to be set
   */
  public set id(Id: number) {
    this.currentId = Id;
  }

  /**
   * Gets current client id
   */
  public get id(): number {
    return this.currentId;
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AccountService {


  private _user: BehaviorSubject<User>;
  public user: Observable<User>;
  private _loading: BehaviorSubject<boolean>;
  public loading: Observable<boolean>;
  url: string;
  hidePassword = true;
  constructor(
    private http: HttpClient,
    private router: Router) {
    this._user = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this._loading = new BehaviorSubject<boolean>(false);
    this.user = this._user.asObservable();
    this.loading = this._loading.asObservable();
    this.url = environment.API_URL;
  }

  public get currentUserValue(): User {
    return this._user.value;
  }

  updateUserState(user: User) {
    this._user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }


  login(credentials: { email: any; password: any; }): Observable<User> {
    return this.http.post<any>(`${this.url}/api/account/login.php`, credentials);
  }


  logout() {
    this._user.next(null);
    localStorage.clear();
    this.router.navigate(['login']);
  }
}

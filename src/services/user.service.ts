import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from 'src/models/user.model';
import { StatModel } from 'src/models/stat.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string;
  constructor(
    private http: HttpClient
  ) {

    this.url = environment.API_URL;
  }


  getUsers(companyId: string, userType: string) {
    return this.http.get<User[]>(`${this.url}/api/user/get-users.php?CompanyId=${companyId}&UserType=${userType}`)
  }
  getAdminStat(companyId: string) {
    return this.http.get<StatModel>(`${this.url}/api/company/get-admin-stat.php?CompanyId=${companyId}`)
  }



  getUser(userId: string) {
    return this.http.get<User>(`${this.url}/api/user/get-user.php?UserId=${userId}`);
  }


  update(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/api/user/update-user.php`, user);
  }

  add(user: User) {
    return this.http.post<User>(`${this.url}/api/user/add-user.php`, user);
  }
  addUserCompany(user: User) {
    return this.http.post<User>(`${this.url}/api/user/add-user-company.php`, user);
  }

}

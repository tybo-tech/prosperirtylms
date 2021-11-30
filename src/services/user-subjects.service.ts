import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserSubjectGrade } from 'src/models/user.subject.grade.model';

@Injectable({
  providedIn: 'root'
})
export class UserSubjectsService {

  private UserSubjectGradeListBehaviorSubject: BehaviorSubject<UserSubjectGrade[]>;
  public UserSubjectGradeListObservable: Observable<UserSubjectGrade[]>;

  private UserSubjectGradeBehaviorSubject: BehaviorSubject<UserSubjectGrade>;
  public UserSubjectGradeObservable: Observable<UserSubjectGrade>;
  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.UserSubjectGradeListBehaviorSubject = new BehaviorSubject<UserSubjectGrade[]>(JSON.parse(localStorage.getItem('UserSubjectGradesList')) || []);
    this.UserSubjectGradeBehaviorSubject = new BehaviorSubject<UserSubjectGrade>(JSON.parse(localStorage.getItem('CurrentUserSubjectGrade')));
    this.UserSubjectGradeListObservable = this.UserSubjectGradeListBehaviorSubject.asObservable();
    this.UserSubjectGradeObservable = this.UserSubjectGradeBehaviorSubject.asObservable();
    this.url = environment.API_URL;
  }

  public get currentUserSubjectGradeValue(): UserSubjectGrade {
    return this.UserSubjectGradeBehaviorSubject.value;
  }



  add(UserSubjectGrade: UserSubjectGrade) {
    return this.http.post<UserSubjectGrade>(`${this.url}/api/usersubject/add-user-subject.php
    `, UserSubjectGrade);
  }
  getUserSubjectGrades(companyId: string) {
    return this.http.get<UserSubjectGrade[]>(`${this.url}/api/usersubject/get-UserSubjectGrades.php?CompanyId=${companyId}`).subscribe(data => {
      this.UserSubjectGradeListBehaviorSubject.next(data || []);
    });
  }

  getByUserId(userId:string): Observable<UserSubjectGrade[]>{
    return this.http.get<UserSubjectGrade[]>(`${this.url}/api/usersubject/get-by-user-id.php?UserId=${userId}`)
  }
  getById(Id:string): Observable<UserSubjectGrade>{
    return this.http.get<UserSubjectGrade>(`${this.url}/api/usersubject/get-by-id.php?Id=${Id}`)
  }
  getLessons(Id:string): Observable<UserSubjectGrade>{
    return this.http.get<UserSubjectGrade>(`${this.url}/api/usersubject/get-topics.php?Id=${Id}`)
  }
  getAssignments(Id:string, userId = null): Observable<UserSubjectGrade>{
    return this.http.get<UserSubjectGrade>(`${this.url}/api/usersubject/get-assignments.php?Id=${Id}&Studentd=${userId}`)
  }
  getUserSubjectStatById(Id:string): Observable<UserSubjectGrade>{
    return this.http.get<UserSubjectGrade>(`${this.url}/api/usersubject/get-usersubject-stat.php?Id=${Id}`)
  }

  update(UserSubjectGrade: UserSubjectGrade) {
    return this.http.post<UserSubjectGrade>(`${this.url}/api/usersubject/update-UserSubjectGrade.php`, UserSubjectGrade);
  }
}

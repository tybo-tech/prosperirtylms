import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Grade } from 'src/models/grade.model';


@Injectable({
  providedIn: 'root'
})
export class GradeService {


  private gradeListBehaviorSubject: BehaviorSubject<Grade[]>;
  public gradeListObservable: Observable<Grade[]>;

  private gradeBehaviorSubject: BehaviorSubject<Grade>;
  public gradeObservable: Observable<Grade>;
  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.gradeListBehaviorSubject = new BehaviorSubject<Grade[]>(JSON.parse(localStorage.getItem('GradesList')) || []);
    this.gradeBehaviorSubject = new BehaviorSubject<Grade>(JSON.parse(localStorage.getItem('CurrentGrade')));
    this.gradeListObservable = this.gradeListBehaviorSubject.asObservable();
    this.gradeObservable = this.gradeBehaviorSubject.asObservable();
    this.url = environment.API_URL;
  }

  public get currentGradeValue(): Grade {
    return this.gradeBehaviorSubject.value;
  }



  add(Grade: Grade) {
    return this.http.post<Grade>(`${this.url}/api/grade/add-grade.php`, Grade);
  }
  getGrades(companyId: string) {
    return this.http.get<Grade[]>(`${this.url}/api/grade/get-grades.php?CompanyId=${companyId}`);
  }
  getGrade(gradeId: string) {
    return this.http.get<Grade>(`${this.url}/api/grade/get-grade-details.php?GradeId=${gradeId}`);
  }
  update(Grade: Grade) {
    return this.http.post<Grade>(`${this.url}/api/grade/update-grade.php`, Grade);
  }


}

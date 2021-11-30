import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'src/models/grade.model';


@Injectable({
  providedIn: 'root'
})
export class SubjectService {


  private subjectListBehaviorSubject: BehaviorSubject<Subject[]>;
  public subjectListObservable: Observable<Subject[]>;

  private subjectBehaviorSubject: BehaviorSubject<Subject>;
  public subjectObservable: Observable<Subject>;
  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.subjectListBehaviorSubject = new BehaviorSubject<Subject[]>(JSON.parse(localStorage.getItem('SubjectsList')) || []);
    this.subjectBehaviorSubject = new BehaviorSubject<Subject>(JSON.parse(localStorage.getItem('currentSubject')));
    this.subjectListObservable = this.subjectListBehaviorSubject.asObservable();
    this.subjectObservable = this.subjectBehaviorSubject.asObservable();
    this.url = environment.API_URL;
  }

  public get currentSubjectValue(): Subject {
    return this.subjectBehaviorSubject.value;
  }



  add(subject: Subject) {
    return this.http.post<Subject>(`${this.url}/api/subject/add-subject.php`, subject);
  }
  getSubjects(companyId: string) {
    return this.http.get<Subject[]>(`${this.url}/api/subject/get-all-subjects.php?CompanyId=${companyId}`)
  }
  getSubject(subjectId: string) {
    return this.http.get<Subject>(`${this.url}/api/subject/get-subject.php?SubjectId=${subjectId}`)
  }
  update(subject: Subject) {
    return this.http.post<Subject>(`${this.url}/api/subject/update-subject.php`, subject);
  }


}

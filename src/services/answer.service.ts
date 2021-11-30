import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Answer } from "src/models/answer.model";


@Injectable({
  providedIn: 'root'
})
export class AnswerService {


  private AnswerListBehaviorSubject: BehaviorSubject<Answer[]>;
  public AnswerListObservable: Observable<Answer[]>;

  private AnswerBehaviorSubject: BehaviorSubject<Answer>;
  public AnswerObservable: Observable<Answer>;
  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.AnswerListBehaviorSubject = new BehaviorSubject<Answer[]>(JSON.parse(localStorage.getItem('answersList')) || []);
    this.AnswerBehaviorSubject = new BehaviorSubject<Answer>(JSON.parse(localStorage.getItem('CurrentAnswer')));
    this.AnswerListObservable = this.AnswerListBehaviorSubject.asObservable();
    this.AnswerObservable = this.AnswerBehaviorSubject.asObservable();
    this.url = environment.API_URL;
  }

  public get currentAnswerValue(): Answer {
    return this.AnswerBehaviorSubject.value;
  }



  add(Answer: Answer) {
    return this.http.post<Answer>(`${this.url}/api/answer/add-answer.php`, Answer);
  }
  addRange(answers: Answer[]) {
    return this.http.post<Answer[]>(`${this.url}/api/answer/add-answer-range.php`, answers);
  }
  getAnswers(subjectId: string) {
    return this.http.get<Answer[]>(`${this.url}/api/answer/get-answers.php?SubjectId=${subjectId}`).subscribe(data => {
      this.AnswerListBehaviorSubject.next(data || []);
    });
  }

  getAnswer(AnswerId: string) {
    return this.http.get<Answer>(`${this.url}/api/answer/get-answer.php?AnswerId=${AnswerId}`);
  }
  delete(AnswerId: string) {
    return this.http.get<Answer>(`${this.url}/api/answer/delete.php?AnswerId=${AnswerId}`);
  }

  getAnswersBySubjectID(subjectId: string, gradeId: string): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.url}/api/answer/get-answers.php?SubjectId=${subjectId}&GradeId=${gradeId}`)
  }
  update(Answer: Answer) {
    return this.http.post<Answer>(`${this.url}/api/answer/update-answer.php`, Answer);
  }


}

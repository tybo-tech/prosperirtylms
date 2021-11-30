import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Question } from "src/models/question.model";


@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  private questionListBehaviorSubject: BehaviorSubject<Question[]>;
  public questionListObservable: Observable<Question[]>;

  private questionBehaviorSubject: BehaviorSubject<Question>;
  public questionObservable: Observable<Question>;
  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.questionListBehaviorSubject = new BehaviorSubject<Question[]>(JSON.parse(localStorage.getItem('QuestionsList')) || []);
    this.questionBehaviorSubject = new BehaviorSubject<Question>(JSON.parse(localStorage.getItem('CurrentQuestion')));
    this.questionListObservable = this.questionListBehaviorSubject.asObservable();
    this.questionObservable = this.questionBehaviorSubject.asObservable();
    this.url = environment.API_URL;
  }

  public get currentQuestionValue(): Question {
    return this.questionBehaviorSubject.value;
  }



  add(question: Question) {
    return this.http.post<Question>(`${this.url}/api/question/add-question.php`, question);
  }
  getQuestions(subjectId: string) {
    return this.http.get<Question[]>(`${this.url}/api/question/get-questions.php?SubjectId=${subjectId}`).subscribe(data => {
      this.questionListBehaviorSubject.next(data || []);
    });
  }

  getQuestion(questionId: string) {
    return this.http.get<Question>(`${this.url}/api/question/get-question.php?QuestionId=${questionId}`);
  }

  getQuestionsBySubjectID(subjectId: string, gradeId: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.url}/api/question/get-questions.php?SubjectId=${subjectId}&GradeId=${gradeId}`)
  }
  update(question: Question) {
    return this.http.post<Question>(`${this.url}/api/question/update-question.php`, question);
  }


}

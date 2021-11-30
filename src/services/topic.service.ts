import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Topic } from "src/models/topiccontent.model";


@Injectable({
  providedIn: 'root'
})
export class TopicService {


  private topicListBehaviorSubject: BehaviorSubject<Topic[]>;
  public topicListObservable: Observable<Topic[]>;

  private topicBehaviorSubject: BehaviorSubject<Topic>;
  public topicObservable: Observable<Topic>;
  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.topicListBehaviorSubject = new BehaviorSubject<Topic[]>(JSON.parse(localStorage.getItem('topicsList')) || []);
    this.topicBehaviorSubject = new BehaviorSubject<Topic>(JSON.parse(localStorage.getItem('Currenttopic')));
    this.topicListObservable = this.topicListBehaviorSubject.asObservable();
    this.topicObservable = this.topicBehaviorSubject.asObservable();
    this.url = environment.API_URL;
  }

  public get currenttopicValue():Topic {
    return this.topicBehaviorSubject.value;
  }



  add(topic:Topic) {
    return this.http.post<Topic>(`${this.url}/api/topic/add-topic.php`, topic);
  }
  gettopics(subjectId: string) {
    return this.http.get<Topic[]>(`${this.url}/api/topic/get-topics.php?SubjectId=${subjectId}`).subscribe(data => {
      this.topicListBehaviorSubject.next(data || []);
    });
  }

  getTopic(topicId: string) {
    return this.http.get<Topic>(`${this.url}/api/topic/get-topic.php?TopicId=${topicId}`);
  }

  getTopicsBySubjectID(subjectId:string, gradeId:string): Observable<Topic[]>{
    return this.http.get<Topic[]>(`${this.url}/api/topic/get-topics.php?SubjectId=${subjectId}&GradeId=${gradeId}`)
  }
  update(topic:Topic) {
    return this.http.post<Topic>(`${this.url}/api/topic/update-topic.php`, topic);
  }


}

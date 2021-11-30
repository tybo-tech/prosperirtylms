import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TopicContent } from 'src/models/topiccontent.model';


@Injectable({
  providedIn: 'root'
})
export class TopicContentService {


  private topicContentListBehaviorSubject: BehaviorSubject<TopicContent[]>;
  public topicContentListObservable: Observable<TopicContent[]>;

  private topicContentBehaviorSubject: BehaviorSubject<TopicContent>;
  public topicContentObservable: Observable<TopicContent>;
  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.topicContentListBehaviorSubject = new BehaviorSubject<TopicContent[]>(JSON.parse(localStorage.getItem('TopicContentsList')) || []);
    this.topicContentBehaviorSubject = new BehaviorSubject<TopicContent>(JSON.parse(localStorage.getItem('CurrentTopicContent')));
    this.topicContentListObservable = this.topicContentListBehaviorSubject.asObservable();
    this.topicContentObservable = this.topicContentBehaviorSubject.asObservable();
    this.url = environment.API_URL;
  }

  public get currentTopicContentValue(): TopicContent {
    return this.topicContentBehaviorSubject.value;
  }



  add(topicContent: TopicContent) {
    return this.http.post<TopicContent>(`${this.url}/api/topiccontent/add-topiccontent.php`, topicContent);
  }
  getTopicContents(subjectId: string) {
    return this.http.get<TopicContent[]>(`${this.url}/api/topiccontent/get-topiccontents.php?SubjectId=${subjectId}`).subscribe(data => {
      this.topicContentListBehaviorSubject.next(data || []);
    });
  }

  getTopicContentById(topicContentId: string) {
    return this.http.get<TopicContent>(`${this.url}/api/topiccontent/get-topiccontent-by-id.php?TopicContentId=${topicContentId}`);
  }
  update(topicContent: TopicContent) {
    return this.http.post<TopicContent>(`${this.url}/api/topiccontent/update-topiccontent.php`, topicContent);
  }


}

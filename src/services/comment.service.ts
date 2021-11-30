import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Comment } from 'src/models/comment.model';


@Injectable({
  providedIn: 'root'
})
export class CommentService {


  private CommentListBehaviorSubject: BehaviorSubject<Comment[]>;
  public CommentListObservable: Observable<Comment[]>;

  private CommentBehaviorSubject: BehaviorSubject<Comment>;
  public CommentObservable: Observable<Comment>;
  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.CommentListBehaviorSubject = new BehaviorSubject<Comment[]>(JSON.parse(localStorage.getItem('CommentsList')) || []);
    this.CommentBehaviorSubject = new BehaviorSubject<Comment>(JSON.parse(localStorage.getItem('CurrentComment')));
    this.CommentListObservable = this.CommentListBehaviorSubject.asObservable();
    this.CommentObservable = this.CommentBehaviorSubject.asObservable();
    this.url = environment.API_URL;
  }

  public get currentCommentValue(): Comment {
    return this.CommentBehaviorSubject.value;
  }



  add(Comment: Comment) {
    return this.http.post<Comment>(`${this.url}/api/comment/add-comment.php`, Comment);
  }
  getComments(otherId: string) {
    return this.http.get<Comment[]>(`${this.url}/api/comment/get-comments.php?OtherId=${otherId}`);
  }
  getComment(CommentId: string) {
    return this.http.get<Comment>(`${this.url}/api/comment/get-comment.php?CommentId=${CommentId}`);
  }
  update(Comment: Comment) {
    return this.http.post<Comment>(`${this.url}/api/comment/update-comment.php`, Comment);
  }


}

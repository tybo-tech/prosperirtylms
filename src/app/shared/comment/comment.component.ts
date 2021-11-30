import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comment } from 'src/models/comment.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { CommentService } from 'src/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() otherId: string;
  user: User;
  comment: Comment;
  heading: string;
  showFilter = true;
  CommentId: string;
  CommentListType: string;
  CommentType: string;
  error
  message: string;
  comments: Comment[];
  constructor(
    private accountService: AccountService,
    private router: Router,
    private commentService: CommentService
  ) {

  }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;

    this.getComments();
  }

  // this.add();


  add() {

  }

  getComments() {
    this.comment = {
      CommentId: '',
      OtherId: this.otherId,
      ParentId: '',
      Name: '',
      UserName: this.user.Name,
      UserDp: this.user.Dp || '',
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1
    }
    if (this.otherId) {
      this.commentService.getComments(this.otherId).subscribe(data => {
        this.comments = data
      })
    }

  }
  save() {
    if (!this.comment.Name)
      return;
    if (this.comment.CreateDate) {
      this.commentService.update(this.comment).subscribe(data => {
        if (data && data.CommentId) {
          // this.message = 'Comment updated successfully.';
          this.getComments();

        }
      })
    } else {
      this.commentService.add(this.comment).subscribe(data => {
        if (data && data.CommentId) {
          // this.view(data);
          // this.message = 'Comment created successfully.';
          this.getComments();

        }
      })
    }

  }
  back() {
    this.router.navigate([`/Comments`]);
  }
}

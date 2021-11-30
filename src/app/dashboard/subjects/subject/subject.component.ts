import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'src/models/grade.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { SubjectService } from 'src/services/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {


  user: User;
  subject: Subject;
  heading: string;
  showFilter = true;
  SubjectId: string;
  SubjectListType: string;
  error
  message: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private subjectService: SubjectService,
    private accountService: AccountService,
    private router: Router,
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.SubjectId = r.id;
      this.user = accountService.currentUserValue;
      if (this.SubjectId === 'add') {
        this.heading = `Adding subject`

        this.subject = {
          SubjectId: '',
          CompanyId: this.user.CompanyId,
          Name: '',
          PassMark: '40',
          Description: '',
          ImageUrl: '',
          Code: '',
          CreateUserId: this.user.UserId,
          ModifyUserId: this.user.UserId,
          IsSelected: false,
          StatusId: 1,
        }
      } else {
        subjectService.getSubject(this.SubjectId).subscribe(data => {
          this.subject = data;
          this.heading = `Subject details.`
        });
      }

    });
  }

  ngOnInit() {
  }

  onPrimaryActionEvent(event) {
    this.add();
  }

  add() {

  }
  save() {
    if (this.subject.CreateDate) {
      this.subjectService.update(this.subject).subscribe(data => {
        if (data && data.SubjectId) {
          this.message = 'Subject updated successfully.';

        }
      })
    } else {
      this.subjectService.add(this.subject).subscribe(data => {
        if (data && data.SubjectId) {
          // this.view(data);
          this.message = 'Subject created successfully.';
        }
      })
    }

  }
  back() {
    this.router.navigate([`/subjects`]);
  }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Grade } from 'src/models/grade.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { GradeService } from 'src/services/grade.service';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent implements OnInit {


  user: User;
  grade: Grade;
  heading: string;
  showFilter = true;
  gradeId: string;
  gradeListType: string;
  gradeType: string;
  error
  message: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private gradeService: GradeService,
    private accountService: AccountService,
    private router: Router,
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.gradeId = r.id;
      this.user = accountService.currentUserValue;
      if (this.gradeId === 'add') {
        this.heading = `Adding a grade`

        this.grade = {
          GradeId: '',
          CompanyId: this.user.CompanyId,
          Name: '',
          InstituteTypeId: 1,
          Description: '',
          CreateUserId: this.user.UserId,
          ModifyUserId: this.user.UserId,
          IsSelected: false,
          StatusId: 1,
        }
      } else {
        gradeService.getGrade(this.gradeId).subscribe(data => {
          this.grade = data;
          this.heading = `Grade details`
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
    if (this.grade.CreateDate) {
      this.gradeService.update(this.grade).subscribe(data => {
        if (data && data.GradeId) {
          this.message = 'Grade updated successfully.';

        }
      })
    } else {
      this.gradeService.add(this.grade).subscribe(data => {
        if (data && data.GradeId) {
          // this.view(data);
          this.message = 'Grade created successfully.';
        }
      })
    }

  }
  back() {
    this.router.navigate([`/grades`]);
  }

}

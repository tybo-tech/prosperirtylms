import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { UserService } from 'src/services/user.service';
import { ROLES } from 'src/app/constants';
import { StatModel } from 'src/models/stat.model';
import { CardModel } from 'src/models/card.model';
import { UserSubjectsService } from 'src/services/user-subjects.service';
import { UserSubjectGrade } from 'src/models/user.subject.grade.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User;
  statModel: StatModel;
  cards: CardModel[];
  userSubjects:UserSubjectGrade[];
  constructor(
    private userService: UserService,
    private accountService: AccountService,
    private userSubjectsService: UserSubjectsService,
  ) { }
  ngOnInit() {
    this.accountService.user.subscribe(data => {
      if (data) {
        this.user = data;
        this.loadUserDashboard();
      }
    })
  }
  loadUserDashboard() {
    if (this.user && this.user.UserType === ROLES[0].Name) {
      //Admin
      this.getAdminStat();
    }
    if (this.user && this.user.UserType === ROLES[1].Name) {
      //Teacher
      this.getUserSubjects();
    }
    if (this.user && this.user.UserType === ROLES[2].Name) {
      //Learner
      this.getUserSubjects();
    }
  }
  getAdminStat() {
    this.userService.getAdminStat(this.user.CompanyId).subscribe(data => {
      this.statModel = data;
      this.cards = [];
      this.cards.push(
        {
          Icon: `assets/images/list.svg`,
          Name: `School Grades`,
          Description : `${this.statModel.Grades} grades` ,
          ActionName: 'Manage grades',
          Url: '/grades'
        },
        {
          Icon: `assets/images/books.svg`,
          Name: `Subjects`,
          Description : `${this.statModel.Subjects} subjects` ,
          ActionName: 'Manage subjects',
          Url: '/subjects'
        },
        {
          Icon: `assets/images/user.svg`,
          Name: `Teachers`,
          Description : `${this.statModel.Teachers} teachers` ,
          ActionName: 'Manage teachers',
          Url: '/users/teachers',
        },
        {
          Icon: `assets/images/stu.svg`,
          Name: `Learners`,
          Description : `${this.statModel.Learners} learners` ,
          ActionName: 'Manage learners',
          Url: '/users/learners',
        }
      )
    })
  }

  getUserSubjects(){
    this.userSubjectsService.getByUserId(this.user.UserId).subscribe(data => {
      this.userSubjects = data;
      if (this.userSubjects && this.userSubjects.length) {
        this.cards = [];
        this.userSubjects.forEach(item=>{
          this.cards.push({
            Icon: `assets/images/list.svg`,
            Name: item.SubjectName,
            Description : item.GradeName,
            ActionName: 'Click for subject details',
            Url: `/subject-feed/${item.Id}`
          })
        })
      }
    });
  }
}

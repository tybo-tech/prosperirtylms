import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { USER_TABS, ROLES, TITLES, USER_SUBJECTS_TABS } from 'src/app/constants';
import { CardModel } from 'src/models/card.model';
import { User } from 'src/models/user.model';
import { UserSubjectGrade } from 'src/models/user.subject.grade.model';
import { AccountService } from 'src/services/account.service';
import { UserSubjectsService } from 'src/services/user-subjects.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-subjects',
  templateUrl: './user-subjects.component.html',
  styleUrls: ['./user-subjects.component.scss']
})
export class UserSubjectsComponent implements OnInit {
  primaryAction = "Assign"
  user: User;
  heading: string;
  showFilter = true;
  userId: string;
  userListType: string;
  userType: string;
  error;
  cards: CardModel[];
  message: string;
  USER_TABS = USER_TABS;
  USER_SUBJECTS_TABS = USER_SUBJECTS_TABS;
  currentTabId: any;
  userSubjects:UserSubjectGrade[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private userSubjectsService: UserSubjectsService,
    private router: Router,
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.userId = r.id;
      this.userListType = r.userType;
      this.userType = ROLES.find(x => x.Id === r.userType).Name;
      this.user = accountService.currentUserValue;
    });
  }

  ngOnInit() {
    this.userSubjectsService.getByUserId(this.userId).subscribe(data => {
      this.userSubjects = data;
      this.cards = [];
      this.userSubjects.forEach(user => {
        this.cards.push(
          {
            Id: user.UserId,
            Icon: `assets/images/user.svg`,
            Name: `${user.SubjectName}`,
            Description: `${user.GradeName}`,
            ActionName: 'Manage grades',
            Url: `/user/${user.UserId}/${this.heading}`
          });
      })
    });
    this.USER_TABS.map(x => x.Class = []);
    USER_TABS[1].Class = ['active'];
  }
getSubjects
  onPrimaryActionEvent(event) {
    this.add();
  }

  add() {

  }
  save() {

  }
  back() {
    this.router.navigate([`/users/${this.userListType}`]);
  }
  
  tab(currentTab) {
    if(currentTab.Id == this.USER_TABS[0].Id){
      this.router.navigate([`/user/${this.userId}/${this.userListType}`]);
    }
    this.USER_TABS.map(x => x.Class = []);
    currentTab.Class = ['active'];
  }
  tabSub(currentTab) {
    this.USER_SUBJECTS_TABS.map(x => x.Class = []);
    currentTab.Class = ['active'];
    this.currentTabId =  currentTab.Id
  }
  onDeleteActionEvent(e){}
}

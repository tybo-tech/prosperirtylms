import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CLASSWORK, HOMEWORK, ASSIGNMENT } from 'src/app/constants';
import { CardModel } from 'src/models/card.model';
import { Topic } from 'src/models/topiccontent.model';
import { User } from 'src/models/user.model';
import { UserSubjectGrade } from 'src/models/user.subject.grade.model';
import { BreadModel } from 'src/models/ux.model';
import { AccountService } from 'src/services/account.service';
import { UserSubjectsService } from 'src/services/user-subjects.service';

@Component({
  selector: 'app-subject-feed',
  templateUrl: './subject-feed.component.html',
  styleUrls: ['./subject-feed.component.scss']
})
export class SubjectFeedComponent implements OnInit {
  userSubjectGradeId;
  user: User;
  cards: CardModel[];
  userSubjet: UserSubjectGrade;
  breads: BreadModel[];
  constructor(
    private userSubjectsService: UserSubjectsService,
    private router: Router,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,



  ) {
    this.activatedRoute.params.subscribe(r => {
      this.userSubjectGradeId = r.id;
      this.getLessons();
    });
  }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;

  }
  getLessons() {
    this.userSubjectsService.getUserSubjectStatById(this.userSubjectGradeId).subscribe(data => {
      if (data) {
        this.userSubjet = data;
        this.loadBread();
        this.cards = [];
        this.cards.push(
          {
            Icon: `assets/images/list.svg`,
            Name: `Lessons`,
            Description: `${this.userSubjet.LessonCount} lessons`,
            ActionName: 'Manage lessons',
            Url: `/lessons/${this.userSubjet.Id}/${this.userSubjectGradeId}`
          },
          {
            Icon: `assets/images/list.svg`,
            Name: `Class works`,
            Description: `${this.userSubjet.ClassworkCount}  items`,
            ActionName: 'Manage class works',
            Url: `/assignments/${this.userSubjet.Id}/${CLASSWORK}`
          },
          {
            Icon: `assets/images/list.svg`,
            Name: `Home works`,
            Description: `${this.userSubjet.HomeworkCount}  items`,
            ActionName: 'Manage home works',
            Url: `/assignments/${this.userSubjet.Id}/${HOMEWORK}`
          },
          {
            Icon: `assets/images/list.svg`,
            Name: `Assignments`,
            Description: `${this.userSubjet.AssignmentCount}  items`,
            ActionName: 'Manage Assignments',
            Url: `/assignments/${this.userSubjet.Id}/${ASSIGNMENT}`
          }
        )

      }
    })

  }
  loadBread() {
    this.breads = [
      {
        Name: `Home`,
        Description: ``,
        Link: `/dashboard`,
        Icon: `assets/images/back-icon.svg`,
      },
      {
        Name: `${this.userSubjet.SubjectName} ${this.userSubjet.GradeName}`,
        Description: ``,
        Link: `/dashboard`,
      }
    ];
  }
}

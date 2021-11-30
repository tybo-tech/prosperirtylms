import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROLES } from 'src/app/constants';
import { CardModel } from 'src/models/card.model';
import { User } from 'src/models/user.model';
import { UserSubjectGrade } from 'src/models/user.subject.grade.model';
import { BreadModel } from 'src/models/ux.model';
import { AccountService } from 'src/services/account.service';
import { UserSubjectsService } from 'src/services/user-subjects.service';
import { Topic } from 'c:/NDU/apps/prosperirtylms/src/models/topiccontent.model';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {

  user: User;

  cards: CardModel[];
  heading;
  backto = 'subject-feed'
  message : string;
  primaryAction = 'Add lesson'
  showFilter = true
  userSubjectGradeId: any;
  userSubjet: UserSubjectGrade;
  lessons:Topic[];
  selectedTopic : Topic
  ROLES = ROLES;
  breads: BreadModel[];

  constructor(
    private accountService: AccountService,
    private userSubjectsService: UserSubjectsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.userSubjectGradeId = r.id;
      this.backto = r.backto;
      this.getLessons();
    });
   }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    if (!this.user || !this.user.Company) {
      this.router.navigate([''])
    }
  }

  onPrimaryActionEvent(event) {
    this.add();
  }

  getLessons() {
    this.userSubjectsService.getLessons(this.userSubjectGradeId).subscribe(data => {
      if (data) {
        this.userSubjet = data;
        this.heading = `${this.userSubjet.SubjectName} lessons`
        this.lessons = data.Topics;
        this.loadBread();
        this.cards = [];
        this.lessons.forEach(item=>{
          this.cards.push(
            {
              Icon: `assets/images/list.svg`,
              Name: item.Name,
              CreateDate : item.CreateDate ,
              ActionName: 'Manage lessons',
              Url: `/lesson/${item.TopicId}/${this.userSubjet.GradeId}/${this.userSubjet.SubjectId}/${this.userSubjet.Id}`
            },
            
          )
        })
       

      }
    })

  }
  loadBread() {
    this.breads = [
      {
        Name: `Back`,
        Description: ``,
        Link: `/dashboard`,
        Icon: `assets/images/back-icon.svg`,
      },
      {
        Name: `${this.userSubjet.SubjectName} ${this.userSubjet.GradeName}`,
        Description: ``,
        Link: `/subject-feed/${this.userSubjectGradeId}`,
      },
      {
        Name: `lessons`,
        Description: ``,
        Link: undefined,
      }
    ];
  }
  add() {
    this.router.navigate([`/lesson/add/${this.userSubjet.GradeId}/${this.userSubjet.SubjectId}/${this.userSubjet.Id}`])
  }
  onDeleteActionEvent(card: CardModel) {
 
  }
  delete(grade: Topic) {
    grade.StatusId = 0;
    // this.gradeService.update(grade).subscribe(data => {
    //   this.getGrades();
    //   this.selectedGrade = null;
    //   this.message = 'Grade deleted.'
    // })
  }
 
}

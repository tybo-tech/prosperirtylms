import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardModel } from 'src/models/card.model';
import { Subject } from 'src/models/Subject.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { SubjectService } from 'src/services/subject.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  user: User;
  selectedSubject: Subject;
  subjects: Subject[];
  cards: CardModel[];
  heading = 'School Subjects'
  backto = 'dashboard'
  message: string;
  primaryAction = 'Add Subject'
  showFilter = true
  constructor(
    private accountService: AccountService,
    private subjectService: SubjectService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    if (!this.user || !this.user.Company) {
      this.router.navigate([''])
    }
    this.getSubjects();
  }

  onPrimaryActionEvent(event) {
    this.add();
  }

  add() {
    this.router.navigate([`/subject/add`])
  }
  onDeleteActionEvent(card: CardModel) {
    const user = this.subjects.find(x => x.SubjectId === card.Id);
    if (user) {
      this.selectedSubject = user;
    }
  }
  delete(Subject: Subject) {
    Subject.StatusId = 0;
    this.subjectService.update(Subject).subscribe(data => {
      this.getSubjects();
      this.selectedSubject = null;
      this.message = 'Subject deleted.'
    })
  }

  getSubjects() {
    this.subjectService.getSubjects(this.user.CompanyId).subscribe(data => {
      this.subjects = data || [];
      if (this.subjects.length) {
        this.subjects = this.subjects.filter(x => Number(x.StatusId) === 1)
        this.cards = [];
        this.subjects.forEach(item => {
          this.cards.push(
            {
              Id: item.SubjectId,
              Icon: `assets/images/user.svg`,
              Name: `${item.Name}`,
              Description: `${item.PassMark} Pass Mark`,
              ActionName: 'Manage Subjects',
              Url: `/subject/${item.SubjectId}`
            });
        })
      }
    });

  }
}

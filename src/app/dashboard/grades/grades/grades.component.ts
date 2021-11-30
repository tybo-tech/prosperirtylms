import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardModel } from 'src/models/card.model';
import { Grade } from 'src/models/grade.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { GradeService } from 'src/services/grade.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {
  user: User;
  grades: Grade[] = [];

  selectedGrade: Grade;
  cards: CardModel[];
  heading = 'School grades'
  backto = 'dashboard'
  message : string;
  primaryAction = 'Add grade'
  showFilter = true

  constructor(
    private accountService: AccountService,
    private gradeService: GradeService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    if (!this.user || !this.user.Company) {
      this.router.navigate([''])
    }
   this.getGrades();
  }

  onPrimaryActionEvent(event) {
    this.add();
  }

  add() {
    this.router.navigate([`/grade/add`])
  }
  onDeleteActionEvent(card: CardModel) {
    const user = this.grades.find(x => x.GradeId === card.Id);
    if (user) {
      this.selectedGrade = user;
    }
  }
  delete(grade: Grade) {
    grade.StatusId = 0;
    this.gradeService.update(grade).subscribe(data => {
      this.getGrades();
      this.selectedGrade = null;
      this.message = 'Grade deleted.'
    })
  }
  getGrades() {
    this.gradeService.getGrades(this.user.CompanyId).subscribe(data=>{
      this.grades = data || [];
      if(this.grades.length){
        this.cards = [];
        this.grades.forEach(item => {
          this.cards.push(
            {
              Id: item.GradeId,
              Icon: `assets/images/user.svg`,
              Name: `${item.Name}`,
              Description: `${item.StatusId ==1 ? 'Active': 'Not active' }`,
              ActionName: 'Manage grades',
              Url: `/grade/${item.GradeId}`
            });
        })
      }
    })

  }

}

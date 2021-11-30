import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROLES } from 'src/app/constants';
import { Assignment } from 'src/models/assignment.model';
import { CardModel } from 'src/models/card.model';
import { Topic } from 'src/models/topiccontent.model';
import { User } from 'src/models/user.model';
import { UserSubjectGrade } from 'src/models/user.subject.grade.model';
import { BreadModel } from 'src/models/ux.model';
import { AccountService } from 'src/services/account.service';
import { AssignmentService } from 'src/services/assignment.service';
import { UserSubjectsService } from 'src/services/user-subjects.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {
  modalHeader: string
  user: User;
  breads: BreadModel[];
  showAdd: boolean
  cards: CardModel[];
  heading;
  backto = 'subject-feed'
  message: string;
  assignmentType: string;
  primaryAction = 'Add lesson'
  showFilter = true
  userSubjectGradeId: any;
  userSubjet: UserSubjectGrade;
  assignments: Assignment[];
  selectedTopic: Topic
  ROLES = ROLES;
  assignment: Assignment
  modal = 'modal'
  constructor(
    private accountService: AccountService,
    private userSubjectsService: UserSubjectsService,
    private activatedRoute: ActivatedRoute,
    private assignmentService: AssignmentService,
    private router: Router,
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.user = this.accountService.currentUserValue;
      if (!this.user || !this.user.Company) {
        this.router.navigate([''])
      }
      this.userSubjectGradeId = r.id;
      this.assignmentType = r.type;
      this.backto = `subject-feed/${this.userSubjectGradeId}`
      this.getAssignments();
    });
  }

  ngOnInit() {

  }

  onPrimaryActionEvent(event) {
    this.add();
  }

  getAssignments() {
    let id = null;
    if (this.user.UserType === ROLES[2].Name)
      id = this.user.UserId;
    this.userSubjectsService.getAssignments(this.userSubjectGradeId, id).subscribe(data => {
      if (data) {
        this.userSubjet = data;
        this.heading = `${this.userSubjet.SubjectName} ${this.assignmentType}s`
        this.assignments = data.Assignments || [];
        this.assignments = this.assignments.filter(x => x.AssignmentType === this.assignmentType)
        this.cards = [];
        this.loadBread();
        this.assignments.forEach(item => {
          this.cards.push(
            {
              Icon: `assets/images/list.svg`,
              Name: item.Tittle,
              CreateDate: item.CreateDate,
              Description: Number(item.SubmitionsCount) > 0 ? `${item.SubmitionsCount} submited` : `No submissions yet`,
              ActionName: 'Manage lessons',
              Url: `/assignment/${item.AssignmentId}`
            },

          )
        })


      }
    })

  }

  add() {
    // this.router.navigate([`/assignment/add`])
    this.assignment = {
      Tittle: '',
      GradeId: this.userSubjet.GradeId,
      SubjectId: this.userSubjet.SubjectId,
      Instructions: '',
      Points: 0,
      DueDate: '',
      DueTime: '',
      NumberOfAttempts: '1',
      SetTimer: '',
      ScoreAttempt: '1',
      AvailabilityFrom: '',
      AvailabilityTo: '',
      AssignmentType: this.assignmentType,
      RequireAttachment: 'no',
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1
    };
    this.showAdd = true;
    this.modalHeader = `Add ${this.assignmentType}`

  }
  onDeleteActionEvent(assignment: Assignment) {

  }
  delete(grade: Topic) {
    grade.StatusId = 0;
    // this.gradeService.update(grade).subscribe(data => {
    //   this.getGrades();
    //   this.selectedGrade = null;
    //   this.message = 'Grade deleted.'
    // })
  }

  loadBread() {
    this.breads = [
      {
        Name: `<i class="fa fa-arrow-left"></i> Back`,
        Description: ``,
        Link: `/subject-feed/${this.userSubjectGradeId}`,
        Icon: `assets/images/back-icon.svg`,
      },
      {
        Name: `${this.userSubjet.SubjectName} ${this.userSubjet.GradeName}`,
        Description: ``,
        Link: `/subject-feed/${this.userSubjectGradeId}`,
      },
      {
        Name: `${this.assignmentType}s`,
        Description: ``,
        Link: undefined,
      }
    ];
  }
  back() {

  }

  view(assignment: Assignment) {
    if (assignment) {
      this.router.navigate(['assignment', assignment.AssignmentId]);
    }
  }

  viewSubmissions(assignment: Assignment) {
    if (assignment) {
      this.router.navigate(['submissions', assignment.AssignmentId]);
    }
  }

  saveAssignment(assignment: Assignment) {
    if (assignment.CreateDate) {
      this.assignmentService.update(assignment).subscribe(data => {
        if (data) {
          assignment.ShowMore = false;
        }
      })
    } else {
      this.assignmentService.add(assignment).subscribe(data => {
        if (data) {
          this.view(data);
        }
      })
    }
  }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ROLES, SUBMISIONS_TABS } from 'src/app/constants';
import { Answer } from 'src/models/answer.model';
import { Assignment } from 'src/models/assignment.model';
import { CardModel } from 'src/models/card.model';
import { StudentAssignment } from 'src/models/student.assignment.model';
import { Topic } from 'src/models/topiccontent.model';
import { User } from 'src/models/user.model';
import { UserSubjectGrade } from 'src/models/user.subject.grade.model';
import { BreadModel } from 'src/models/ux.model';
import { AccountService } from 'src/services/account.service';
import { AnswerService } from 'src/services/answer.service';
import { AssignmentService } from 'src/services/assignment.service';
import { StudentAssignmentService } from 'src/services/student.assignment.service';
import { UserSubjectsService } from 'src/services/user-subjects.service';

@Component({
  selector: 'app-assignment-submissions',
  templateUrl: './assignment-submissions.component.html',
  styleUrls: ['./assignment-submissions.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]

})
export class AssignmentSubmissionsComponent implements OnInit {

  modalHeader: string
  user: User;
  breads: BreadModel[];
  showAdd: boolean
  canPublish: boolean
  cards: CardModel[];
  heading;
  backto = 'subject-feed'
  message: string;
  assignmentType: string;
  primaryAction = 'Add lesson'
  showFilter = true
  userSubjectGradeId: any;
  studentAssignments: StudentAssignment[];
  assignments: Assignment[];
  selectedTopic: Topic
  ROLES = ROLES;
  assignment: Assignment
  modal = 'modal'
  SUBMISIONS_TABS = SUBMISIONS_TABS;
  studentAssignmentsPublished: StudentAssignment[];
  allStudentAssignments: StudentAssignment[];
  constructor(
    private accountService: AccountService,
    private userSubjectsService: UserSubjectsService,
    private activatedRoute: ActivatedRoute,
    private assignmentService: AssignmentService,
    private studentAssignmentService: StudentAssignmentService,
    private answerService: AnswerService,
    private router: Router,
    private messageService: MessageService,

  ) {
    this.activatedRoute.params.subscribe(r => {
      this.userSubjectGradeId = r.id;
      this.assignmentType = r.type;
      this.backto = `subject-feed/${this.userSubjectGradeId}`
      this.getAssignments();
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

  getAssignments() {
    this.studentAssignmentService.getStudentAssignmentforAssignment(this.userSubjectGradeId).subscribe(data => {
      if (data) {
        this.allStudentAssignments = data;
        this.studentAssignments = this.allStudentAssignments.filter(x => x.AssignmentStatus === 'submited' && x.Answers && x.Answers.length);
        this.checkUserType();
        if (!this.studentAssignments.length) {
          this.tab(SUBMISIONS_TABS[1])
        }
        this.studentAssignments.forEach(item => {
          this.caculateMarks(item.Answers, item)
        })
        this.cards = [];
        this.loadBread();
      }
    })

  }
  checkUserType() {
    if (this.user && this.user.UserType === ROLES[2].Name) {
      this.allStudentAssignments = this.allStudentAssignments.filter(x => x.Studentd === this.user.UserId);
    }
  }
  publish() {
    this.studentAssignments.map(x => x.AssignmentStatus = 'published');
    this.studentAssignmentService.updateRange(this.studentAssignments).subscribe(updated => {
      this.messageService.add({ severity: 'success', summary: 'Marks published', detail: 'Marks published was successful' });

    })
  }
  add() {
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
        Name: `Here`,
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

  saveAnswer(answer, answers: Answer[], studentAssignment: StudentAssignment) {
    if (answer.IsCoorect === 'Correct answer')
      answer.GradeOptained = answer.Question.Score;
    else {
      answer.GradeOptained = 0;
      answer.IsCoorect = 'Incorrect answer';
    }
    this.answerService.update(answer).subscribe(data => {
      console.log(data);
      this.caculateMarks(answers, studentAssignment)

    })
  }

  saveScoreAnswer(answer, answers: Answer[], studentAssignment: StudentAssignment) {
    this.answerService.update(answer).subscribe(data => {
      console.log(data);
      this.caculateMarks(answers, studentAssignment, true)

    })
  }
  caculateMarks(answers: Answer[], studentAssignment: StudentAssignment, save = false) {
    studentAssignment.Marks = 0;
    studentAssignment.TotalMarks = 0;
    answers.forEach(answer => {
      studentAssignment.TotalMarks += Number(answer.Question.Score);
      studentAssignment.Marks += Number(answer.GradeOptained);
      studentAssignment.PercentMarks = (studentAssignment.Marks / studentAssignment.TotalMarks) * 100;

    })
    if (save) {
      this.studentAssignmentService.update(studentAssignment).subscribe(updated => {
        this.messageService.add({ severity: 'success', summary: 'Marked updated', detail: 'Marks saved was successful' });

      })
    }

  }

  tab(currentTab) {
    if (currentTab.Id == this.SUBMISIONS_TABS[0].Id) {
      this.studentAssignments = this.allStudentAssignments.filter(x => x.AssignmentStatus === 'submited' && x.Answers && x.Answers.length);
      this.canPublish = this.studentAssignments.length > 0;
    }
    if (currentTab.Id == this.SUBMISIONS_TABS[1].Id) {
      this.studentAssignments = this.allStudentAssignments.filter(x => x.AssignmentStatus === 'published' && x.Answers && x.Answers.length);
      this.canPublish = false;
    }
    this.SUBMISIONS_TABS.map(x => x.Class = []);
    currentTab.Class = ['active'];
  }
}

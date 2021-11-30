import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ASSIGNMENT_STATUSES, QUESTION_TYPES } from 'src/app/constants';
import { Answer } from 'src/models/answer.model';
import { Assignment } from 'src/models/assignment.model';
import { StudentAssignment } from 'src/models/student.assignment.model';
import { User } from 'src/models/user.model';
import { AnswerService } from 'src/services/answer.service';
import { StudentAssignmentService } from 'src/services/student.assignment.service';

@Component({
  selector: 'app-student-assignment',
  templateUrl: './student-assignment.component.html',
  styleUrls: ['./student-assignment.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]

})
export class StudentAssignmentComponent implements OnInit {
  @Input() assignment: Assignment;
  @Input() user: User;
  studentAssignments: StudentAssignment[];
  startTime: string;
  attemptNumber: number;
  studentAssignment: StudentAssignment;
  reachedAllowedAttacmpts: boolean;
  displayModal = false;
  canUpload = true;
  modal = "modal";
  modalBody: string;
  modalHeader: string;
  constructor(
    private answerService: AnswerService,
    private messageService: MessageService,
    private studentAssignmentService: StudentAssignmentService
  ) { }

  ngOnInit() {
    this.studentAssignmentService
      .getStudentAssignmentByStudentdAndAssigmetId(this.user.UserId, this.assignment.AssignmentId)
      .subscribe(data => {
        this.studentAssignments = data;
        let lastAttempt: StudentAssignment;
        if (data && data.length) {
          lastAttempt = data[data.length - 1];
        }
        this.attemptNumber = this.studentAssignments.length + 1;
        if (this.attemptNumber <= Number(this.assignment.NumberOfAttempts)) {
          this.addStudentAssignment();
        } else {
          if (
            lastAttempt
            && lastAttempt.AssignmentStatus === ASSIGNMENT_STATUSES.STARTED.Name
            && (this.studentAssignments.length === Number(this.assignment.NumberOfAttempts))) {
            this.studentAssignment = lastAttempt;
            console.log('lastAttempt', lastAttempt);


          } else {
            this.reachedAllowedAttacmpts = true;
            this.modalHeader = 'Attemps limit reached';
            this.modalBody = 'This attempt is no longer permitted'
            this.displayModal = true;
            // this.messageService.add({ severity: 'error', summary: 'Sorry', detail: 'You have reached your attempt limit' });

          }
        }

      });
    this.startTime = new Date().toString();
    console.log(this.startTime);

  }
  onDoneSaveAnswer(e) {
    if (e) {
      // this.getAssignment();
    }
  }

  submit() {
    const answers: Answer[] = [];

    if (!this.assignment || !this.assignment.Questions || !this.studentAssignment) {
      return;
    }

    this.studentAssignment.Marks = 0;
    this.assignment.Questions.forEach(question => {

      // Type Answer
      if (question.QuestionType === QUESTION_TYPES[3].Name) {
        let answer = question.Answers[0];
        if (answer) {
          answer.GradeOptained = 0;
          answer.IsCoorect = 'Not marked';
          answers.push(answer)
        }
      } else {
        // MCQ
        question.Answers.forEach(item => {
          if (item.IsSelected) {
            if (item.IsCoorect === 'Correct answer')
              item.GradeOptained = question.Score;
            else {
              item.GradeOptained = 0;
              item.IsCoorect = 'Incorrect answer';
            }
            answers.push(item)
          }
          this.studentAssignment.Marks += Number(item.GradeOptained);
        })
      }



    });
    if (answers && answers.length && answers.length >= this.assignment.Questions.length) {
      answers.map(x => x.StudentId = this.user.UserId);
      answers.map(x => x.AssignmentId = this.studentAssignment.StudentAssignmentId);
      this.answerService.addRange(answers).subscribe(data => {
        console.log(data);
        if (data && data.length) {
          this.studentAssignment.AssignmentStatus = ASSIGNMENT_STATUSES.SUBMITED.Name;
          answers.forEach(answerItem => {
            if (answerItem.IsCoorect === "Correct answer") {

            }
          });
          this.studentAssignmentService.update(this.studentAssignment).subscribe(updated => {
            console.log(updated);

          })
        }
        this.messageService.add({ severity: 'success', summary: 'Submited', detail: 'Your submission was successful' });
        // this.ngOnInit();

      })
    } else {
      this.messageService.add({ severity: 'error', summary: 'Answer all questions', detail: 'Opps, you are not done yet' });

    }


  }

  addStudentAssignment() {
    this.studentAssignment = {
      Id: 0,
      StudentAssignmentId: '',
      AssignmentId: this.assignment.AssignmentId,
      Studentd: this.user.UserId,
      StartTime: this.startTime,
      FinishTime: '',
      Marks: -1,
      MarkedById: "",
      MarkedByName: "",
      MarkedDate: "",
      Comments: "",
      AssignmentStatus: ASSIGNMENT_STATUSES.STARTED.Name,
      AttemptNumber: this.attemptNumber,
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1
    }
    this.studentAssignmentService.add(this.studentAssignment).subscribe(data => {
      if (data && data.StudentAssignmentId) {
        this.studentAssignment = data;

      }
    });
  }
  back() {

  }
}

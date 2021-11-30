import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { QUESTION_TYPES, ROLES, IMAGE_CROP_SIZE } from 'src/app/constants';
import { environment } from 'src/environments/environment';
import { Answer } from 'src/models/answer.model';
import { Question } from 'src/models/question.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { AnswerService } from 'src/services/answer.service';
import { AssignmentService } from 'src/services/assignment.service';
import { UploadService } from 'src/services/upload.service';

@Component({
  selector: 'app-student-answer',
  templateUrl: './student-answer.component.html',
  styleUrls: ['./student-answer.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class StudentAnswerComponent implements OnInit {

  @Input() question: Question;
  @Output() doneSaveAnswer: EventEmitter<boolean> = new EventEmitter<boolean>();
  QUESTION_TYPES = QUESTION_TYPES;
  assignmentId: string;
  backId: string;
  type: string;
  selectedAnswer: Answer;
  user: User;
  ROLES = ROLES;
  LEARNER = ROLES[2].Name;

  editorStyle = {
    marginBottom: '30px',
    background: '#fff',
  }

  editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      ['blockquote', 'code-block'],

      ['clean'],
      ['link', 'video', 'image'],

    ]
  };
  parsedHtml: Document;
  index: number;
  constructor(
    private assignmentService: AssignmentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private answerService: AnswerService,
    private accountService: AccountService,
    private uploadService: UploadService,
    private sanitizer: DomSanitizer,



  ) {

    this.user = accountService.currentUserValue;
    this.activatedRoute.params.subscribe(r => {
      this.assignmentId = r.id;
      this.backId = r.backId;
      this.type = r.type;
    });
  }

  ngOnInit() {
    if (this.question && this.question.Answers) {
      this.question.Answers.forEach(item => {
        item.AnswerView = this.sanitizer.bypassSecurityTrustHtml(item.Answer);
      });

      if(this.question.QuestionType === QUESTION_TYPES[3].Name){
        this.question.Answers = [];
        this.question.Answers.push({
          AnswerId: '',
          QuestionId: this.question.QuestionId,
          AssignmentId: this.question.AssignmentId,
          StudentId: '',
          MarkedBy: '',
          AnswerStatus: '',
          GradeOptained: 0,
          Answer: '',
          IsCoorect: '',
          ImageUrl: '',
          CreateUserId: '',
          ModifyUserId: '',
          StatusId: 1,
          ShowMore: true
        });
      }
    }
  }

  back() {
    this.router.navigate([`admin/dashboard/assignments/${this.backId}/${this.type}`]);
  }

  saveAnswer(answer: Answer) {
    if (answer.IsCoorect)
      answer.IsCoorect = 'Correct answer';
    else
      answer.IsCoorect = '';


    if (answer.CreateDate && answer.QuestionId.length > 1) {
      this.answerService.update(answer).subscribe(data => {
        // this.getAssignment();
        this.doneSaveAnswer.emit(true);

      })
    } else {
      this.answerService.add(answer).subscribe(data => {
        // this.question.Answers.push(data);
        this.doneSaveAnswer.emit(true);
      })
    }

  }

  view(item: Answer) {
    this.selectedAnswer = item;

    item.ShowMore = true;
  }

  hide(question: Question) {
    question.ShowMore = false;
  }

  delete(answer: Answer) {
    this.answerService.delete(answer.AnswerId).subscribe(data => {
      if (Number(data) === 1) {
        this.doneSaveAnswer.emit(true);
      }
    })
  }

  add() {
    const newAnswer : Answer = {
      AnswerId: '',
      QuestionId: this.question.QuestionId,
      AssignmentId: this.question.AssignmentId,
      StudentId: '',
      MarkedBy: '',
      AnswerStatus: '',
      GradeOptained: 0,
      Answer: '',
      IsCoorect: '',
      ImageUrl: '',
      CreateUserId: '',
      ModifyUserId: '',
      StatusId: 1,
      ShowMore: true
    };
    this.question.Answers.push(newAnswer)
  }

  typeChanged(question: Question) {
    if (question.QuestionType === this.QUESTION_TYPES[0].Name) {

    }
    if (question.QuestionType === this.QUESTION_TYPES[1].Name) {

    }
    if (question.QuestionType === this.QUESTION_TYPES[2].Name) {

    }
  }





  formatBody(index, answer: Answer) {
    this.selectedAnswer = answer;
    if (index == 0) {
      let parser = new DOMParser();
      this.parsedHtml = parser.parseFromString(this.selectedAnswer.Answer, 'text/html');
      this.index = 0;
    }


    if (this.parsedHtml.images.length && index < this.parsedHtml.images.length) {
      this.convertImageToUrl(this.parsedHtml.images[index].src);
    } else {
      const body = this.parsedHtml.documentElement.innerHTML
      this.selectedAnswer.Answer = body;
      this.saveAnswer(this.selectedAnswer);
    }

  }

  convertImageToUrl(img: string) {
    if (img.includes("data:")) {
      this.resizedataURL(img);
    } else {
      // convert next image
      this.index++;
      this.formatBody(this.index, this.selectedAnswer);
    }
  }
  resizedataURL(datas) {
    const image = document.createElement('img');
    image.onload = (readerEvent: any) => {
      const canvas = document.createElement('canvas');
      const maxSize = IMAGE_CROP_SIZE;
      let width = image.width;
      let height = image.height;
      if (width > height) {
        if (width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }
      }
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(image, 0, 0, width, height);

      var dataURI = canvas.toDataURL();

      const resizedImage = this.dataURLToBlob(dataURI);
      let extention = 'iio.jpg';

      let fileOfBlob = new File([resizedImage], extention);
      // upload
      let formData = new FormData();
      formData.append('file', fileOfBlob);
      formData.append('name', 'iio');
      this.uploadService.uploadFile(formData).subscribe(response => {
        // this.loading = false;

        if (response && response.length > 15) {
          this.parsedHtml.images[this.index].src = `${environment.API_URL}/api/upload/${response}`;
          this.parsedHtml.images[this.index].setAttribute("width", "100%");
          this.index++;
          setTimeout(() => {
            this.formatBody(this.index, this.selectedAnswer);
          }, 3000)
        }
      });

    };
    image.src = datas;
  }


  dataURLToBlob(dataURL) {
    const BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) === -1) {
      const parts = dataURL.split(',');
      const contentType = parts[0].split(':')[1];
      const raw = parts[1];

      return new Blob([raw], { type: contentType });
    }

    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;

    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }

}

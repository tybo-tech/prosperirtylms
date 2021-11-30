import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IMAGE_CROP_SIZE, QUESTION_TYPES, ROLES, SCORE_ATTEMPT_OPTIONS, YES_NO_OPTIONS } from 'src/app/constants';
import { environment } from 'src/environments/environment';
import { Assignment } from 'src/models/assignment.model';
import { Question } from 'src/models/question.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { AssignmentService } from 'src/services/assignment.service';
import { QuestionService } from 'src/services/question.service';
import { UploadService } from 'src/services/upload.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]

})
export class AssignmentComponent implements OnInit {

  assignmentId: string;
  assignment: Assignment;
  backId: string;
  type: string;
  selectedQuestion: Question;
  user: User;
  canUpload = true;
  QUESTION_TYPES = QUESTION_TYPES;
  ROLES = ROLES;
  SCORE_ATTEMPT_OPTIONS = SCORE_ATTEMPT_OPTIONS;
  YES_NO_OPTIONS = YES_NO_OPTIONS;
  TEACHER = ROLES[1].Name;
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
    private questionService: QuestionService,
    private accountService: AccountService,
    private uploadService: UploadService,
    private sanitizer: DomSanitizer,
    private messageService: MessageService,




  ) {

    this.user = accountService.currentUserValue;
    this.activatedRoute.params.subscribe(r => {
      this.assignmentId = r.id;
      this.backId = r.backId;
      this.type = r.type;
      this.getAssignment();
    });
  }

  ngOnInit() {

  }
  getAssignment() {
    this.assignmentService.getAssignment(this.assignmentId).subscribe(data => {
      if (data) {
        this.assignment = data;
        data.Questions.forEach(item => {
          item.QuestionView = this.sanitizer.bypassSecurityTrustHtml(item.Question);
        });
      }
    })
  }
  saveAssignment(assignment: Assignment) {
    if (assignment.CreateDate) {
      this.assignmentService.update(assignment).subscribe(data => {
        if (data) {
          assignment.ShowMore = false;
          this.messageService.add({ severity: 'success', summary: 'Saved', detail: `${assignment.AssignmentType} saved.` });

        }
      })
    } else {
      this.assignmentService.add(assignment).subscribe(data => {
        if (data) {
          assignment.ShowMore = false;
          this.messageService.add({ severity: 'success', summary: 'Updated', detail: `${assignment.AssignmentType} updated.` });

        }
      })
    }
  }

  back() {
    debugger
    this.router.navigate([`admin/dashboard/assignments/${this.backId}/${this.type}`]);
  }

  saveQuestion(question) {
    if (question.CreateDate && question.QuestionId.length > 1) {
      this.questionService.update(question).subscribe(data => {
        this.getAssignment();
        this.selectedQuestion = undefined;
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: `Question updated.` });

      })
    } else {
      this.questionService.add(question).subscribe(data => {
        if(data){
          const item: Question = data;
          item.QuestionView = this.sanitizer.bypassSecurityTrustHtml(item.Question);
          this.assignment.Questions.push(item);
          this.selectedQuestion = undefined;
          this.messageService.add({ severity: 'success', summary: 'Updated', detail: `Question updated.` });

        }

      })
    }

  }

  view(item: Question) {
    this.selectedQuestion = item;

    item.ShowMore = true;
  }

  hide(question: Question) {
    question.ShowMore = false;
  }

  add() {
    this.selectedQuestion = {
      QuestionId: '',
      AssignmentId: this.assignmentId,
      SectionId: '',
      Question: '',
      QuestionType: this.QUESTION_TYPES[0].Name,
      Score: 1,
      ImageUrl: '',
      CreateUserId: this.user.UserId,
      ModifyUserId: this.user.UserId,
      StatusId: 1
    }
  }

  typeChanged(question: Question) {
    if (question.QuestionType === this.QUESTION_TYPES[0].Name) {

    }
    if (question.QuestionType === this.QUESTION_TYPES[1].Name) {

    }
    if (question.QuestionType === this.QUESTION_TYPES[2].Name) {

    }
  }





  formatBody(index, question: Question) {
    this.selectedQuestion = question;
    if (index == 0) {
      let parser = new DOMParser();
      this.parsedHtml = parser.parseFromString(this.selectedQuestion.Question, 'text/html');
      this.index = 0;
    }


    if (this.parsedHtml.images.length && index < this.parsedHtml.images.length) {
      this.convertImageToUrl(this.parsedHtml.images[index].src);
    } else {
      const body = this.parsedHtml.documentElement.innerHTML
      this.selectedQuestion.Question = body;
      this.saveQuestion(this.selectedQuestion);
    }

  }

  convertImageToUrl(img: string) {
    if (img.includes("data:")) {
      this.resizedataURL(img);
    } else {
      // convert next image
      this.index++;
      this.formatBody(this.index, this.selectedQuestion);
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
            this.formatBody(this.index, this.selectedQuestion);
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

  onDoneSaveAnswer(e) {
    if (e) {
      this.getAssignment();
    }
  }
}

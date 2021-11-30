import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FILE, IMAGE_CROP_SIZE, ROLES, VOICE } from 'src/app/constants';
import { environment } from 'src/environments/environment';
import { Grade } from 'src/models/grade.model';
import { Topic, TopicContent } from 'src/models/topiccontent.model';
import { User } from 'src/models/user.model';
import { BreadModel } from 'src/models/ux.model';
import { AccountService } from 'src/services/account.service';
import { TopicService } from 'src/services/topic.service';
import { TopicContentService } from 'src/services/topiccontent.service';
import { UploadService } from 'src/services/upload.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]

})
export class LessonComponent implements OnInit {


  user: User;
  heading: string;
  showFilter = true;
  topicId: string;
  gradeListType: string;
  gradeType: string;
  error
  message: string;
  topic: Topic;
  subjectId: any;
  gradeId: any;
  backto: any;
  ROLES = ROLES;
  FILE = FILE;
  VOICE = VOICE;
  breads: BreadModel[];

  newTopicContent: TopicContent;
  editorStyle = {
    marginBottom: '30px',
    // height: '400px',
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
      // ['formula']

    ]
  };
  index: number;
  parsedHtml: any;
  showRecording: boolean;
  loading: boolean;
  htmlBody: any;
  voices: TopicContent[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private router: Router,
    private topicService: TopicService,
    private uploadService: UploadService,
    private topicContentService: TopicContentService,
    private sanitizer: DomSanitizer,
    private messageService: MessageService,



  ) {
    this.activatedRoute.params.subscribe(r => {
      this.topicId = r.id;
      this.subjectId = r.subjectId;
      this.gradeId = r.gradeId;
      this.backto = r.backto;
      this.user = accountService.currentUserValue;
      if (this.topicId === 'add') {
        this.heading = `Adding a lesson`

        this.topic = {
          TopicId: '',
          SubjectId: this.subjectId,
          GradeId: this.gradeId,
          Name: '',
          Description: '',
          ImageUrl: '',
          CreateUserId: this.user.UserId,
          ModifyUserId: this.user.UserId,
          StatusId: 1
        }

        this.loadBread();
      } else {
        this.getTopic();
      }

    });
  }

  ngOnInit() {
  }
  loadBread() {
    this.breads = [
      {
        Name: `Back`,
        Description: ``,
        Link: `lessons/${this.backto}`,
        Icon: `assets/images/back-icon.svg`,
      },
      {
        Name: `/ ${this.topic.Name || 'New lesson'}`,
        Description: ``,
        Link: `/dashboard`,
      }
    ];
  }
  getTopic() {
    this.topicService.getTopic(this.topicId).subscribe(data => {
      if (data && data.TopicContent) {
        this.voices = data.TopicContent.filter(x => x.ContentType === VOICE || x.ContentType === FILE);

        // data.TopicContent.forEach(item => {
        //   item.SafeContentBody = this.sanitizer.bypassSecurityTrustHtml(item.ContentBody);
        // });
        this.topic = data;
        this.loadBread();
        this.htmlBody = this.sanitizer.bypassSecurityTrustHtml(this.topic.Description);
        this.heading = `Lesson details`

      }
    });
  }
  onPrimaryActionEvent(event) {
    this.add();
  }

  add() {

  }

  public uploadFile = (files: FileList) => {
    if (files.length === 0) {
      return;
    }

    Array.from(files).forEach(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', `prop.${file.name.split('.')[file.name.split('.').length - 1]}`); // file extention
      this.uploadService.uploadFile(formData).subscribe(url => {
        this.doneRecording(`${environment.API_URL}/api/upload/${url}`);
      });

    });
  }


  onSelectFiles(e) {
    if (e && e.target && e.target.files) {
      this.uploadFile(e.target.files)
    }


  }

  save() {
    this.message = undefined;
    this.loading = true;

    if (this.topic.CreateDate) {
      this.topicService.update(this.topic).subscribe(data => {
        this.loading = false;
        if (data && data.TopicId) {
          this.message = 'Lesson updated successfully.';
          this.messageService.add({ severity: 'success', summary: 'Marks published', detail: this.message });

        }
      })
    } else {
      this.topicService.add(this.topic).subscribe(data => {
        this.loading = false;
        if (data && data.TopicId) {
          // this.view(data);
          this.message = 'Lesson created successfully.';
          this.messageService.add({ severity: 'success', summary: 'Marks published', detail: this.message });

        }
      })
    }


  }
  back() {
    this.router.navigate([`lessons/${this.backto}`]);
  }

  formatBody(index) {
    if (index == 0) {
      let parser = new DOMParser();
      this.parsedHtml = parser.parseFromString(this.topic.Description, 'text/html');
      this.index = 0;
    }


    if (this.parsedHtml.images.length && index < this.parsedHtml.images.length) {
      this.convertImageToUrl(this.parsedHtml.images[index].src);
    } else {
      const body = this.parsedHtml.documentElement.innerHTML
      this.topic.Description = body;
      this.save();
    }

  }

  convertImageToUrl(img: string) {
    if (img.includes("data:")) {
      this.resizedataURL(img);
    } else {
      // convert next image
      this.index++;
      this.formatBody(this.index);
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
      console.log(dataURI);

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
          // this.parsedHtml.images[this.index].setAttribute("width", "60%");
          this.parsedHtml.images[this.index].setAttribute("class", "lesson-image");
          this.index++;
          setTimeout(() => {
            this.formatBody(this.index);
          }, 3000)
        }
      });

      /////////////////////////////////////////
      // Use and treat your Data URI here !! //
      /////////////////////////////////////////
    };

    // We put the Data URI in the image's src attribute
    image.src = datas;
  }


  dataURLToBlob(dataURL) {
    const BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) === -1) {
      // tslint:disable-next-line: no-shadowed-variable
      const parts = dataURL.split(',');
      // tslint:disable-next-line: no-shadowed-variable
      const contentType = parts[0].split(':')[1];
      // tslint:disable-next-line: no-shadowed-variable
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

  doneRecording(url: string) {
    if (url && url.includes('.weba')) {
      this.newTopicContent = {
        TopicContentId: `${new Date().getTime()}`,
        TopicId: this.topic.TopicId,
        SubjectId: this.topic.SubjectId,
        Tittle: '',
        ContentBody: url,
        ContentType: 'Voice',
        CreateUserId: this.user.UserId,
        ModifyUserId: this.user.UserId,
        StatusId: 1,
        EditMode: true
      };
      this.showRecording = false;
      this.saveTopicContent(this.newTopicContent);
    } else {
      this.newTopicContent = {
        TopicContentId: `${new Date().getTime()}`,
        TopicId: this.topic.TopicId,
        SubjectId: this.topic.SubjectId,
        Tittle: '',
        ContentBody: url,
        ContentType: 'File',
        CreateUserId: this.user.UserId,
        ModifyUserId: this.user.UserId,
        StatusId: 1,
        EditMode: true
      };
      this.showRecording = false;
      this.saveTopicContent(this.newTopicContent);

    }

  }

  saveTopicContent(item: TopicContent) {

    if (item && item.CreateDate && item.CreateDate.length > 5) {
      this.topicContentService.update(item).subscribe(data => {
        if (data && data.TopicContentId) {
          this.getTopic();
          this.message = 'Lesson updated successfully.';

        }
      });
    } else {
      this.topicContentService.add(item).subscribe(data => {
        if (data && data.TopicContentId) {
          this.getTopic();
          this.message = 'Lesson updated successfully.';

        }
      });
    }

  }
}

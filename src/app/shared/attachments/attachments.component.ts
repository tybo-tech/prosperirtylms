import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { Images } from 'src/models/images.model';
import { User } from 'src/models/user.model';
import { ImagesService } from 'src/services/images.service';
import { UploadService } from 'src/services/upload.service';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss'],
  providers: [MessageService]

})
export class AttachmentsComponent implements OnInit {
  @Input() files: Images[] = [];
  @Input() user: User;
  @Input() otherId: string;
  @Input() canUpload: boolean;

  constructor(
    private uploadService: UploadService, private imagesService: ImagesService,    private messageService: MessageService,


  ) { }

  ngOnInit() {
  }
  onSelectFiles(e) {
    if (e && e.target && e.target.files) {
      this.uploadFile(e.target.files)
    }


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
        const fileToUpload: Images = {
          ImageId: '',
          OtherId: this.otherId,
          OptionId: file.name,
          Url: `${environment.API_URL}/api/upload/${url}`,
          IsMain: 1,
          CreateUserId: this.user.UserId,
          ModifyUserId: this.user.UserId,
          StatusId: 1
        }
        this.saveImage(fileToUpload);

      });

    });
  }
  saveImage(image: Images) {
    this.imagesService.add(image).subscribe(data => {
      if (data && data.ImageId) {
        this.files.push(data);
        this.messageService.add({ severity: 'success', summary: 'Uploaded', detail: `File attached.` });

      }
    })
  }
}

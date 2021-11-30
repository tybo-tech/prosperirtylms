import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  name:string;
  email:string;
  cell:string;
  message:string;
  constructor() { }

  ngOnInit() {
    window.scroll(0,0);
  }

}

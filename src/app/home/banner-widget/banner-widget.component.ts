import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-widget',
  templateUrl: './banner-widget.component.html',
  styleUrls: ['./banner-widget.component.scss']
})
export class BannerWidgetComponent implements OnInit {
@Input() heading;
  constructor() { }

  ngOnInit() {
  }

}

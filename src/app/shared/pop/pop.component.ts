import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.scss']
})
export class PopComponent implements OnInit {
@Input() message;
@Input() class;
  constructor() { }

  ngOnInit() {
  }

}

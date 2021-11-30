import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardModel } from 'src/models/card.model';

@Component({
  selector: 'app-card-list-widget',
  templateUrl: './card-list-widget.component.html',
  styleUrls: ['./card-list-widget.component.scss']
})
export class CardListWidgetComponent implements OnInit {
@Input() cards: CardModel[];
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  goto(url){
    this.router.navigate([url]);
  }
}

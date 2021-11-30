import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ROLES } from 'src/app/constants';
import { CardModel } from 'src/models/card.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-item-list-Widget',
  templateUrl: './item-list-Widget.component.html',
  styleUrls: ['./item-list-Widget.component.scss']
})
export class ItemListWidgetComponent implements OnInit {

  @Input() cards: CardModel[];
  @Input() heading: string;
  @Input() backto: string;
  @Input() primaryAction: string;
  @Input() showFilter: string;
  @Output() primaryActionEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() deleteEvent: EventEmitter<CardModel> = new EventEmitter<CardModel>();

  searchString: string;
  user: User;
  ROLES = ROLES;
  constructor(
    private router: Router,
    private accountService : AccountService
  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
  }
  goto(url) {
    this.router.navigate([url]);
  }

  primaryActionClicked() {
    this.primaryActionEvent.emit(true);
  }
  deleteClicked(card: CardModel) {
    this.deleteEvent.emit(card);
  }
}

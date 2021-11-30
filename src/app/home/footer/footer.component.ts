import { Component, OnInit } from '@angular/core';
import { MENUITEMS } from 'src/app/constants';
import { NavModel } from 'src/models/nav.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  items: NavModel[] = MENUITEMS;
  showNav
  user: User;
  constructor(private accountService: AccountService,) { }

  ngOnInit() {
    this.accountService.user.subscribe(data => {
      this.user = data;
    })
  }

}

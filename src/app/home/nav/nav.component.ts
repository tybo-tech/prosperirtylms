import { Component, OnInit } from '@angular/core';
import { MENUITEMS, ROLES } from 'src/app/constants';
import { NavModel } from 'src/models/nav.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  items: NavModel[] = MENUITEMS;
  showNav
  user: User;
  constructor(private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.accountService.user.subscribe(data => {
      if (data) {
        this.user = data;
        this.items = [
          {
            Name: `Dashboard`,
            Url: `dashboard`
          }
        ];

        if (this.user.UserType === ROLES[0].Name) {
          this.items.push(
            {
              Name: `Grades`,
              Url: `grades`
            },
            {
              Name: `Subjects`,
              Url: `subjects`
            },
            {
              Name: `Teachers`,
              Url: `users/teachers`
            },
            {
              Name: `Learners`,
              Url: `users/learners`
            }
          );
        }

        if (this.user.UserType === ROLES[1].Name) {
          this.items.push(
       
          );
        }

        
        if (this.user.UserType === ROLES[2].Name) {
       
        }

        this.items.push(
          {
            Name: `Hello, ${data.Name} (${data.UserType})`,
            Url: `profile`
          }
        );
      } else {
        this.user =  null;
        this.items = MENUITEMS;
      }
    })

  }

  logout() {
    this.accountService.logout();
  }

}

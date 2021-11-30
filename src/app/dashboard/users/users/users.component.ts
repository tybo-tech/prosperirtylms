import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROLES } from 'src/app/constants';
import { CardModel } from 'src/models/card.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userType: string;
  user: User;
  users: User[];
  cards: CardModel[];
  heading: string;
  backto = 'dashboard';
  primaryAction = 'Add ';
  showFilter = true;
  error;
  selectedUser: User;
  message: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private accountService: AccountService,
    private router: Router,
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.heading = r.id;
      this.userType = ROLES.find(x => x.Id === r.id).Name;
      this.primaryAction = `Add ${this.userType}`;
      this.user = accountService.currentUserValue;
this.getUsers();
    });
  }

  ngOnInit() {
  }
  getUsers() {
    this.userService.getUsers(this.user.CompanyId, this.userType).subscribe(data => {
      this.users = data;
      if (this.users && this.users.length) {
        this.cards = [];
        this.users.forEach(user => {
          this.cards.push(
            {
              Id: user.UserId,
              Icon: `assets/images/user.svg`,
              Name: `${user.Name}`,
              Description: `${user.Email}`,
              ActionName: 'Manage grades',
              Url: `/user/${user.UserId}/${this.heading}`
            });
        })

      }
    });
  }
  onPrimaryActionEvent(event) {
    this.add();
  }

  add() {
    this.router.navigate([`/user/add/${this.heading}`])
  }
  onDeleteActionEvent(card: CardModel) {
    const user = this.users.find(x => x.UserId === card.Id);
    if (user) {
      this.selectedUser = user;
    }
  }
  delete(user: User) {
    user.StatusId = 0;
    this.userService.update(user).subscribe(data => {
      this.getUsers();
      this.selectedUser = null;
      this.message = 'User deleted.'
    })
  }
}

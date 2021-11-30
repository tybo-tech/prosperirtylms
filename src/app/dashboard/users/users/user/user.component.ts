import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROLES, TITLES, USER_TABS } from 'src/app/constants';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User;
  selectedUser: User;
  heading: string;
  showFilter = true;
  userId: string;
  userListType: string;
  userType: string;
  error
  message: string;
  USER_TABS = USER_TABS;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private accountService: AccountService,
    private router: Router,
  ) {
    this.activatedRoute.params.subscribe(r => {
      this.userId = r.id;
      this.userListType = r.userType;
      this.userType = ROLES.find(x => x.Id === r.userType).Name;
      this.user = accountService.currentUserValue;
      if (this.userId === 'add') {
        this.heading = `Adding a ${this.userType}`

        this.selectedUser = {
          UserId: '',
          CompanyId: this.user.CompanyId,
          UserType: this.userType,
          Tittle: TITLES[0],
          Name: '',
          Surname: '',
          Email: '',
          PhoneNumber: '',
          Password: '1234',
          Dp: '',
          AddressLineHome: '',
          AddressUrlHome: '',
          AddressLineWork: '',
          AddressUrlWork: '',
          CreateUserId: this.user.UserId,
          ModifyUserId: this.user.UserId,
          StatusId: 1,
          UserToken: ''
        }
      } else {
        userService.getUser(this.userId).subscribe(data => {
          this.selectedUser = data;
          this.heading = `${this.userType} details`
        });
      }

    });
  }

  ngOnInit() {
    this.USER_TABS.map(x => x.Class = []);
    USER_TABS[0].Class = ['active'];
  }

  onPrimaryActionEvent(event) {
    this.add();
  }

  add() {

  }
  save() {
    if (this.selectedUser.CreateDate) {
      this.userService.update(this.selectedUser).subscribe(data => {
        if (data && data.UserId) {
          this.message = 'User updated successfully';

        }
      })
    } else {
      this.userService.add(this.selectedUser).subscribe(data => {
        if (data && data.UserId) {
          // this.view(data);
          this.message = 'User created successfully';
        }
      })
    }

  }
  back() {
    this.router.navigate([`/users/${this.userListType}`]);
  }

  tab(currentTab) {
    if (currentTab.Id == this.USER_TABS[1].Id) {
      this.router.navigate([`/user-subject/${this.selectedUser.UserId}/${this.userListType}`]);
    }
    this.USER_TABS.map(x => x.Class = []);
    currentTab.Class = ['active'];
  }
}

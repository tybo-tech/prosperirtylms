import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { USER_TABS, ROLES, TITLES } from 'src/app/constants';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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

  }

  ngOnInit() {

    this.selectedUser = this.accountService.currentUserValue;
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

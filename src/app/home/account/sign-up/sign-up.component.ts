import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROLES } from 'src/app/constants';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user: User;
  email: string;
  password: string;
  error: string;
  ROLES = ROLES;
  tabId: any;
  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = {
      UserId: '',
      CompanyId: '',
      UserType: 'Admin',
      Tittle: '',
      Name: '',
      Surname: '',
      Email: '',
      PhoneNumber: '',
      Password: undefined,
      Dp: '',
      AddressLineHome: '',
      AddressUrlHome: '',
      AddressLineWork: '',
      AddressUrlWork: '',
      CreateUserId: 'sign-up-shop',
      ModifyUserId: 'sign-up-shop',
      StatusId: 1
    };
    this.goto(ROLES[0]);
  }
  login() {
    this.error = ''
    this.accountService.login({ email: this.email, password: this.password }).subscribe(data => {
      console.log(data);
      if (data && data.UserId) {
        this.accountService.updateUserState(data);
        this.router.navigate(['/dashboard']);
      } else {
        this.accountService.updateUserState(null);
        this.error = 'Opps wrong login details'
      }

    })
  }


  
  save() {
    this.userService.addUserCompany(this.user).subscribe(data => {
    });
  }


  goto(currentTab) {
    this.ROLES.map(x => x.Class = []);
    currentTab.Class = ['active'];
    this.tabId = currentTab.Id;
  }

}

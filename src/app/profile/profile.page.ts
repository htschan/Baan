import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  registerCredentials = { 'email': 'a@sorawit.ch', 'password': '' };

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.auth.emailLogin(this.registerCredentials.email, this.registerCredentials.password).then(() => {
      console.log('login email/password logged in');
    });
  }

  public createAccount() {
  }
}

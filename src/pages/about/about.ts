import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LogoutPage } from '../logout/logout';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {
  }

  signOut() {
    this.navCtrl.push(LogoutPage);
  }

}

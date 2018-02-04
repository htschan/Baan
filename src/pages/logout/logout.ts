import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams,public auth: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

  logout() {
    this.auth.signOut();
    this.navCtrl.popToRoot();
    // this.viewCtrl.dismiss();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}

import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { App } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public auth: AuthService,
    public appCtrl: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

  logout() {
    this.auth.signOut().then(() => {
      this.viewCtrl.dismiss();
      this.navCtrl.popToRoot();
      // this.appCtrl.getRootNav().push(LoginPage);
      this.navCtrl.setRoot(LoginPage);
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}

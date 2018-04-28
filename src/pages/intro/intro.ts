import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { HomePage } from '../home/home';
import { LayoutService } from '../../services/layout.service';


@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService, public layoutService: LayoutService) { }

  ionViewDidLoad() {
    this.layoutService.hideSplitPane();
    this.auth.isAuthenticated().then(result => {
      this.navCtrl.setRoot(HomePage);
    });
  }
}

import { Component, Inject, VERSION } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LogoutPage } from '../logout/logout';
import { BUILD_INFO } from '../../services/product.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  version: string;
  buildInfo: string;

  constructor(@Inject(BUILD_INFO) buildInfo: string, public navCtrl: NavController) {
    this.version = VERSION.full;
    this.buildInfo = buildInfo;
  }

  signOut() {
    this.navCtrl.push(LogoutPage);
  }
}

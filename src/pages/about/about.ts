import { Component, Inject, VERSION } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { LogoutPage } from '../logout/logout';
import { BUILD_INFO } from '../../services/product.service';
import { YoutubeService } from '../../services/youtube.service';
import { LayoutService } from '../../services/layout.service';
import { AuthService } from '../../services/auth.service';
import { VERSION as VERSION_GEN } from '../../services/version';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  version: string;
  buildInfo: string;
  backendbuildinfo: string;
  versionGen: any;

  constructor(@Inject(BUILD_INFO) buildInfo: string,
    public navCtrl: NavController,
    public ytService: YoutubeService,
    public layoutService: LayoutService,
    public authService: AuthService) {
    this.version = VERSION.full;
    this.buildInfo = buildInfo;
    this.versionGen = VERSION_GEN;
    ytService.apiinfo().subscribe(data => {
      this.backendbuildinfo = data.buildTimeStamp;
    })
  }

  signOut() {
    this.navCtrl.push(LogoutPage);
  }
}

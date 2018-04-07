import { Component, Inject, VERSION } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LogoutPage } from '../logout/logout';
import { BUILD_INFO } from '../../services/product.service';
import { YoutubeService } from '../../services/youtube.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  version: string;
  buildInfo: string;
  backendbuildinfo: string;

  constructor(@Inject(BUILD_INFO) buildInfo: string,
    public navCtrl: NavController,
    public ytService: YoutubeService,
    public layoutService: LayoutService) {
    this.version = VERSION.full;
    this.buildInfo = buildInfo;
    ytService.apiinfo().subscribe(data => {
      this.backendbuildinfo = data.buildTimeStamp;
    })
  }

  signOut() {
    this.navCtrl.push(LogoutPage);
  }
}

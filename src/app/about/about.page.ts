import { Component, Inject, VERSION } from '@angular/core';
import { YoutubeService } from '../services/youtube.service';
import { LayoutService } from '../services/layout.service';
import { VERSION as VERSION_GEN } from '../services/version';
import { Router } from '@angular/router';
import { APP_CONFIG_DI } from '../../myhomeappconfig';
import { IAppConfig } from '../shared/IAppConfig';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage {
  version: string;
  buildInfo: string;
  backendbuildinfo: string;
  versionGen: any;

  constructor(@Inject(APP_CONFIG_DI) appConfig: IAppConfig,
    private router: Router,
    public ytService: YoutubeService,
    public layoutService: LayoutService) {
    this.version = VERSION.full;
    this.buildInfo = appConfig.Bts;
    this.versionGen = VERSION_GEN;
    ytService.apiinfo().subscribe(data => {
      this.backendbuildinfo = data.buildTimeStamp;
    });
  }

  reload() {
    window.location.reload(true);
  }
}

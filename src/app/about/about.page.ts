import { Component, Inject, VERSION } from '@angular/core';
import { BUILD_INFO } from '../services/product.service';
import { YoutubeService } from '../services/youtube.service';
import { LayoutService } from '../services/layout.service';
import { AuthService } from '../services/auth.service';
import { VERSION as VERSION_GEN } from '../services/version';
import { Router } from '@angular/router';

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

  constructor(@Inject(BUILD_INFO) buildInfo: string,
    private router: Router,
    public ytService: YoutubeService,
    public layoutService: LayoutService,
    public authService: AuthService) {
    this.version = VERSION.full;
    this.buildInfo = buildInfo;
    this.versionGen = VERSION_GEN;
    ytService.apiinfo().subscribe(data => {
      this.backendbuildinfo = data.buildTimeStamp;
    });
  }

  signOut() {
    this.router.navigate(['logout']);
  }
}

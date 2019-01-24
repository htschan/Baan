import { Component, ViewChild, HostListener } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LayoutService } from './services/layout.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('content') routerOutlet: any;

  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'List', url: '/list', icon: 'list' },
    { title: 'Shopping', url: '/Shopping', icon: 'list' },
    { title: 'Todo', url: '/Todo', icon: 'list' },
    { title: 'Audio Tracks', url: '/Songlist', icon: 'list' },
    { title: 'Youtube Download', url: '/Youtubedownload', icon: 'list' },
    { title: 'Camera', url: '/Camera', icon: 'list' },
    { title: 'Test', url: '/Test', icon: 'list' },
    { title: 'GPS', url: '/Gps', icon: 'list' },
    { title: 'KML', url: '/Kml', icon: 'list' },
    { title: 'Motion', url: '/Motion', icon: 'list' },
    { title: 'Chat', url: '/ChatRoom', icon: 'list' },
    { title: 'Profil', url: '/Profil', icon: 'list' },
    { title: 'Über', url: '/About', icon: 'list' },
    { title: 'Kontakt', url: '/Contact', icon: 'list' }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public layoutService: LayoutService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.layoutService.setScreenSize(
        this.platform.width(),
        this.platform.height(),
        this.routerOutlet.nativeElement.parentElement.firstChild.offsetWidth,
        this.routerOutlet.nativeElement.parentElement.firstChild.offsetHeight);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.layoutService.setScreenSize(
      event.target.innerWidth,
      event.target.innerHeight,
      this.routerOutlet.nativeElement.parentElement.firstChild.offsetWidth,
      this.routerOutlet.nativeElement.parentElement.firstChild.offsetHeight);
  }

  splitChanged(event: Event) {
    console.log('split ');
  }
}

import { Component, ViewChild } from '@angular/core';
import { Platform, ModalController, Nav } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { ContactPage } from '../pages/contact/contact';
import { AboutPage } from '../pages/about/about';
import { SonglistPage } from '../pages/songlist/songlist';
import { YoutubedownloadPage } from '../pages/youtubedownload/youtubedownload';
import { CameraPage } from '../pages/camera/camera';
import { TestpagePage } from '../pages/testpage/testpage';
import { GpspagePage } from '../pages/gpspage/gpspage';
import { MotionPage } from '../pages/motion/motion';
import { ChatRoomPage } from '../pages/chat-room/chat-room';
import { SplashPage } from '../pages/splash/splash';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public modalCtrl: ModalController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Einkaufen', component: HomePage },
      { title: 'Audio Traks', component: SonglistPage },
      { title: 'Youtube Download', component: YoutubedownloadPage },
      { title: 'Kamera', component: CameraPage },
      { title: 'Test', component: TestpagePage },
      { title: 'GPS', component: GpspagePage },
      { title: 'Motion', component: MotionPage },
      { title: 'Chat', component: ChatRoomPage },
      { title: 'Über', component: AboutPage },
      { title: 'Kontakt', component: ContactPage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      let splash = this.modalCtrl.create(SplashPage);
      splash.present();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

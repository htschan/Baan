import { Component, ViewChild, HostListener } from '@angular/core';
import { Platform, ModalController, Nav, Events } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { ShoppingPage } from '../pages/shop/shopping/shopping';
import { ContactPage } from '../pages/contact/contact';
import { AboutPage } from '../pages/about/about';
import { SonglistPage } from '../pages/songlist/songlist';
import { YoutubedownloadPage } from '../pages/youtubedownload/youtubedownload';
import { CameraPage } from '../pages/camera/camera';
import { TestPage } from '../pages/testpage/testpage';
import { GpsPage } from '../pages/gpspage/gpspage';
import { MotionPage } from '../pages/motion/motion';
import { ChatRoomPage } from '../pages/chat/chat-room/chat-room';
import { SplashPage } from '../pages/splash/splash';
import { LayoutService } from '../services/layout.service';
import { TodoPage } from '../pages/todo/todo/todo';
import { IntroPage } from '../pages/intro/intro';

@Component({
  selector: 'my-app',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = IntroPage;
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, 
    public events: Events,
    public modalCtrl: ModalController, 
    public layoutService: LayoutService) {
    this.initializeApp();

    events.subscribe('user:signin', (user) => {
      this.rootPage = HomePage;
    });

    // used for an example of ngFor and navigation
    this.pages = [
      // { title: 'Home', component: HomePage },
      { title: 'Einkaufen', component: ShoppingPage },
      { title: 'Todo', component: TodoPage },
      { title: 'Audio Tracks', component: SonglistPage },
      { title: 'Youtube Download', component: YoutubedownloadPage },
      { title: 'Kamera', component: CameraPage },
      { title: 'Test', component: TestPage },
      { title: 'GPS', component: GpsPage },
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
      this.layoutService.setScreenSize(
        this.platform.width(),
        this.platform.height(),
        this.nav.getNativeElement().offsetWidth,
        this.nav.getNativeElement().offsetHeight);
    });
  }

  openHomePage() {
    this.nav.setRoot(HomePage);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerHeight;
    event.target.innerWidth;
    this.layoutService.setScreenSize(
      event.target.innerWidth,
      event.target.innerHeight,
      this.nav.getNativeElement().offsetWidth,
      this.nav.getNativeElement().offsetHeight);
  }

  splitChanged(event: Event) {
    console.log("split ");
  }
}

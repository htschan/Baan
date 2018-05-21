import { Component, OnInit } from '@angular/core';
import { Events, ModalController, PopoverController, NavController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { NavGuard } from '../support/nav.guard';
import { AuthService } from '../../services/auth.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends NavGuard implements OnInit, OnDestroy {
  displayName;
  tiles: Array<{ title: string, imgsrc: string, pgname: string }> = [];
  tilesd: Array<Array<{ title: string, imgsrc: string, pgname: string }>> = [];
  widthsubscription: any;
  showSlides: boolean;

  constructor(
    public navCtrl: NavController,
    public auth: AuthService,
    public appCtrl: App,
    public modalCtrl: ModalController,
    public events: Events,
    public layoutService: LayoutService,
    public popoverCtrl: PopoverController) {
    super(auth, modalCtrl, appCtrl);
    events.subscribe('user:signout', (user) => {
      console.log("home.component user logged out");
    });
    events.subscribe('user:signin', (user) => {
      console.log("home.component user signed in");
      this.displayName = user.displayName;
    });
    console.dir(AuthService);
    this.tiles = [
      { title: 'Einkaufen', imgsrc: '../../assets/imgs/mm_shop.png', pgname: 'ShoppingPage' },
      { title: 'Todo', imgsrc: '../../assets/imgs/mm_todo.png', pgname: 'TodoPage' },
      { title: 'Audio Tracks', imgsrc: '../../assets/imgs/mm_tracks.png', pgname: 'SonglistPage' },
      { title: 'Youtube Download', imgsrc: '../../assets/imgs/mm_tube.png', pgname: 'YoutubedownloadPage' },
      { title: 'Kamera', imgsrc: '../../assets/imgs/mm_camera.png', pgname: 'CameraPage' },
      { title: 'Test', imgsrc: '../../assets/imgs/mm_test.png', pgname: 'TestPage' },
      { title: 'GPS', imgsrc: '../../assets/imgs/mm_gps.png', pgname: 'GpsPage' },
      { title: 'KML', imgsrc: '../../assets/imgs/mm_gps.png', pgname: 'KmlPage' },
      { title: 'Motion', imgsrc: '../../assets/imgs/mm_motion.png', pgname: 'MotionPage' },
      { title: 'Chat', imgsrc: '../../assets/imgs/mm_chat.png', pgname: 'ChatRoomPage' },
      { title: 'Über', imgsrc: '../../assets/imgs/mm_about.png', pgname: 'AboutPage' },
      { title: 'Kontakt', imgsrc: '../../assets/imgs/mm_contact.png', pgname: 'ContactPage' },
    ];
    this.widthsubscription = layoutService.data.subscribe(data => {
      let colcount = Math.trunc(Math.abs(data.contentWidth - 80) / 120 + 1);
      this.showSlides = colcount <= this.tiles.length;
      let tileix = 0;
      let tmpd: Array<Array<{ title: string, imgsrc: string, pgname: string }>> = [];
      let done = false;
      while (!done) {
        let tmp: Array<{ title: string, imgsrc: string, pgname: string }> = [];
        for (let i = 0; i < colcount && !done; i++) {
          tmp.push(this.tiles[tileix++]);
          done = tileix >= this.tiles.length;
        }
        tmpd.push(tmp);
      }
      this.tilesd = tmpd;
    });
  }

  ngOnInit(): void {
    console.log("Home on init");
  }

  ngOnDestroy(): void {
    this.events.unsubscribe('user:signout');
    this.events.unsubscribe('user:signin');
    this.widthsubscription.unsubscribe();
  }

  openPage(page: string) {
    console.dir(page);
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(page);
  }
}

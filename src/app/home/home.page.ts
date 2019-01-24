import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Events, PopoverController } from '@ionic/angular';
import { LayoutService } from '../services/layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  displayName;
  tiles: Array<{ title: string, imgsrc: string, pgname: string }> = [];
  tilesd: Array<Array<{ title: string, imgsrc: string, pgname: string }>> = [];
  widthsubscription: any;
  showSlides: boolean;

  constructor(
    public auth: AuthService,
    private router: Router,
    public events: Events,
    public layoutService: LayoutService,
    public popoverCtrl: PopoverController) {
    events.subscribe('user:signout', (user) => {
      console.log('home.component user logged out');
    });
    events.subscribe('user:signin', (user) => {
      console.log('home.component user signed in');
      this.displayName = user.displayName;
    });
    console.dir(AuthService);
    this.tiles = [
      { title: 'Einkaufen', imgsrc: '../../assets/imgs/mm_shop.png', pgname: 'Shopping' },
      { title: 'Todo', imgsrc: '../../assets/imgs/mm_todo.png', pgname: 'Todo' },
      { title: 'Audio Tracks', imgsrc: '../../assets/imgs/mm_tracks.png', pgname: 'Songlist' },
      { title: 'Youtube Download', imgsrc: '../../assets/imgs/mm_tube.png', pgname: 'Youtubedownload' },
      { title: 'Kamera', imgsrc: '../../assets/imgs/mm_camera.png', pgname: 'Camera' },
      { title: 'Test', imgsrc: '../../assets/imgs/mm_test.png', pgname: 'Test' },
      { title: 'GPS', imgsrc: '../../assets/imgs/mm_gps.png', pgname: 'Gps' },
      { title: 'KML', imgsrc: '../../assets/imgs/mm_gps.png', pgname: 'Kml' },
      { title: 'Motion', imgsrc: '../../assets/imgs/mm_motion.png', pgname: 'Motion' },
      { title: 'Chat', imgsrc: '../../assets/imgs/mm_chat.png', pgname: 'ChatRoom' },
      { title: 'Profil', imgsrc: '../../assets/imgs/mm_about.png', pgname: 'Profil' },
      { title: 'Über', imgsrc: '../../assets/imgs/mm_about.png', pgname: 'About' },
      { title: 'Kontakt', imgsrc: '../../assets/imgs/mm_contact.png', pgname: 'Contact' },
    ];
    this.widthsubscription = layoutService.data.subscribe(data => {
      const colcount = Math.trunc(Math.abs(data.contentWidth - 80) / 120 + 1);
      this.showSlides = colcount <= this.tiles.length;
      let tileix = 0;
      const tmpd: Array<Array<{ title: string, imgsrc: string, pgname: string }>> = [];
      let done = false;
      while (!done) {
        const tmp: Array<{ title: string, imgsrc: string, pgname: string }> = [];
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
    console.log('Home on init');
  }

  ngOnDestroy(): void {
    this.events.unsubscribe('user:signout');
    this.events.unsubscribe('user:signin');
    this.widthsubscription.unsubscribe();
  }

  openPage(page: string) {
    this.router.navigate([`${page}`]);
  }
}

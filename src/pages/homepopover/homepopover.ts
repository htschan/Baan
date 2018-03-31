import { Component } from '@angular/core';
import { NavController,ViewController } from 'ionic-angular';
import { SonglistPage } from '../songlist/songlist';
import { YoutubedownloadPage } from '../youtubedownload/youtubedownload';
import { CameraPage } from '../camera/camera';


@Component({
  selector: 'page-homepopover',
  templateUrl: 'homepopover.html',
})
export class HomepopoverPage {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
  }

  close() {
    this.viewCtrl.dismiss();
  }

  gotoSonglist() {
    this.navCtrl.push(SonglistPage);
    this.viewCtrl.dismiss();
  }

  gotoYoutubeDownload() {
    this.navCtrl.push(YoutubedownloadPage);
    this.viewCtrl.dismiss();
  }

  gotoCamera() {
    this.navCtrl.push(CameraPage);
    this.viewCtrl.dismiss();
  }

  gotoTestpage() {
    this.navCtrl.push('TestpagePage');
    this.viewCtrl.dismiss();
  }

  gotoGpspage() {
    this.navCtrl.push('GpspagePage');
    this.viewCtrl.dismiss();
  }

  gotoMotionpage() {
    this.navCtrl.push('MotionPage');
    this.viewCtrl.dismiss();
  }

}

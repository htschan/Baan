import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { YoutubeService } from '../../services/youtube.service';
import { ViewvideoPage } from '../viewvideo/viewvideo';

@IonicPage()
@Component({
  selector: 'page-songlist',
  templateUrl: 'songlist.html',
})
export class SonglistPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public ytService: YoutubeService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SonglistPage');
  }

  viewVideo(url: string, title: string) {
    this.navCtrl.push(ViewvideoPage, { url: url, title: title });
  }

  gotoRoot() {
    this.navCtrl.popAll();
  }
}

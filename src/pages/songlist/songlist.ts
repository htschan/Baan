import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { YoutubeService } from '../../services/youtube.service';


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

}

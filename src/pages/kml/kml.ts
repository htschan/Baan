import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-kml',
  templateUrl: 'kml.html',
})
export class KmlPage {

  lat: number = 51.678418;
  lng: number = 7.809007;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KmlPage');
  }

}

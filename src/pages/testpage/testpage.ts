import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({ defaultHistory: ['HomePage','TestpagePage']})
@Component({
  selector: 'page-testpage',
  templateUrl: 'testpage.html',
})
export class TestpagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestpagePage');
  }

}

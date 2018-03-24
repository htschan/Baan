import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';


@Component({
  selector: 'page-viewvideo',
  templateUrl: 'viewvideo.html',
})
export class ViewvideoPage {

  video: any = {
    url: '',
    title: ''
  };

  loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController) {
    this.video.url = this.navParams.get('url');
    this.video.title = this.navParams.get('title');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewvideoPage');
  }

  ionViewWillEnter(): void {
    this.loading = this.loadingCtrl.create({
      content: 'Bitte warten...'
    });

    this.loading.present();
  }

  handleIFrameLoadEvent(): void {
    this.loading.dismiss();
  }
}

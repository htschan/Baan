import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-viewvideo',
  templateUrl: './viewvideo.component.html',
  styleUrls: ['./viewvideo.component.scss']
})
export class ViewvideoComponent implements OnInit {

  video: any = {
    url: '',
    title: ''
  };
  loading: any;

  constructor(private route: ActivatedRoute, public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.video.url = this.route.snapshot.paramMap.get('url');
    this.video.title = this.route.snapshot.paramMap.get('title');
  }

  async ionViewWillEnter() {
    this.loading = await this.loadingCtrl.create({
      message: 'Bitte warten...',
      spinner: 'crescent',
      duration: 2000
    });
    return await this.loading.present();
  }

  handleIFrameLoadEvent(): void {
    this.loading.dismiss();
  }
}

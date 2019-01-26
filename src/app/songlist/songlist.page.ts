import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../services/youtube.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ViewdetailPage } from './viewdetail/viewdetail.page';
import { YtMetaDataVm } from '../../viewmodels/ytmetadata';

@Component({
  selector: 'app-songlist',
  templateUrl: './songlist.page.html',
  styleUrls: ['./songlist.page.scss'],
})
export class SonglistPage {
  constructor(private router: Router, public ytService: YoutubeService, public modalController: ModalController) {
  }

  viewVideo(url: string, title: string) {
    this.router.navigate(['Songlist/viewvideo', { url: url, title: title }]);
  }

  deleteSong(item: YtMetaDataVm) {
    this.ytService.deleteSong(item).subscribe(data => {
      console.log(data);
    });
  }

  async viewDetails(item: YtMetaDataVm) {
    const modal = await this.modalController.create({
      component: ViewdetailPage,
      componentProps: { value: item }
    });
    return await modal.present();
  }
}

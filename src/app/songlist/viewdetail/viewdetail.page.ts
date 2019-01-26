import { Component, OnInit, Input } from '@angular/core';
import { YtMetaDataVm } from '../../../viewmodels/ytmetadata';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-viewdetail',
  templateUrl: './viewdetail.page.html',
  styleUrls: ['./viewdetail.page.scss'],
})
export class ViewdetailPage implements OnInit {

  @Input() value: YtMetaDataVm;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}

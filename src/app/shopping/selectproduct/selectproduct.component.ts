import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-selectproduct',
  templateUrl: './selectproduct.component.html',
  styleUrls: ['./selectproduct.component.scss']
})
export class SelectproductComponent {

  cat;
  constructor(
    private modalCtrl: ModalController,
    public prodService: ProductService) {
  }

  selectProduct(item: any, key: any) {
    this.modalCtrl.dismiss({ item: item, key: key });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}

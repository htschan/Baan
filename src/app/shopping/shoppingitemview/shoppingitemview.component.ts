import { Component, OnInit } from '@angular/core';
import { ShoppingItemVm } from '../../../viewmodels/shoppingitem';
import { ProductService } from '../../services/product.service';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-shoppingitemview',
  templateUrl: './shoppingitemview.component.html',
  styleUrls: ['./shoppingitemview.component.scss']
})
export class ShoppingitemviewComponent {
  param: ShoppingItemVm;

  constructor(
    public prodService: ProductService,
    public modalCtrl: ModalController,
    public navParams: NavParams) {
    this.param = navParams.get('data') as ShoppingItemVm;
  }

  dismiss() {
    this.modalCtrl.dismiss({ 'item1': 'value1' }, 'viewed');
  }

  async editItem(item: any) {
    const modal = await this.modalCtrl.create({
      component: ShoppingitemviewComponent,
      componentProps: { data: item }
    });
    modal.onDidDismiss().then(data => {
      if (data) {
        const vm = new ShoppingItemVm(data);
        this.prodService.updateShoppinglistItem(vm.Key, vm);
        this.param = vm;
      }
    });
    return await modal.present();
  }
}

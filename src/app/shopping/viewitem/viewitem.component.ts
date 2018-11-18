import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingItemVm } from '../../../viewmodels/shoppingitem';
import { DbService } from '../../services/db.service';
import { EdititemComponent } from '../edititem/edititem.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-viewitem',
  templateUrl: './viewitem.component.html',
  styleUrls: ['./viewitem.component.scss']
})
export class ViewitemComponent implements OnInit {
  prod$;

  constructor(
    public db: DbService,
    public modalCtrl: ModalController,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.prod$ = this.db.doc$(`shoppinglist/${id}`);
  }

  async editItem(item?: ShoppingItemVm) {
    const modal = await this.modalCtrl.create({
      component: EdititemComponent,
      componentProps: { item }
    });
    return await modal.present();
  }
}

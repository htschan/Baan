import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { AuthService } from '../../services/auth.service';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShoppingItemVm } from '../../../viewmodels/shoppingitem';

@Component({
  selector: 'app-edititem',
  templateUrl: './edititem.component.html',
  styleUrls: ['./edititem.component.scss']
})
export class EdititemComponent implements OnInit {
  itemForm: FormGroup;
  item;

  constructor(
    private db: DbService,
    private auth: AuthService,
    public modal: ModalController,
    public fb: FormBuilder,
    private navParams: NavParams
  ) {
    this.item = navParams.get('item') as ShoppingItemVm;
  }

  ngOnInit() {
    const data: ShoppingItemVm = {
      Key: '',
      Name: '',
      Description: '',
      Important: false,
      Favorite: false,
      Quantity: 1,
      ...this.item
    };
    this.itemForm = this.fb.group({
      Name: [data.Name, [Validators.required, Validators.minLength(1), Validators.maxLength(120)]],
      Description: [data.Description],
      Important: [data.Important, Validators.required],
      Favorite: [data.Favorite, Validators.required],
      Quantity: [data.Quantity, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  async createItem() {
    const uid = await this.auth.uid();
    const id = this.item ? this.item.id : '';
    const data = {
      uid,
      createdAt: Date.now(),
      State: 'pending',
      ...this.item,
      ...this.itemForm.value
    };
    this.db.updateAt(`shoppinglist/${id}`, data);
    this.modal.dismiss();
  }
}

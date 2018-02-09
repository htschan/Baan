import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'page-shoppingitem',
  templateUrl: 'shoppingitem.html',
})
export class ShoppingItemPage {
  param: any;

  itemForm: FormGroup;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder) {
    this.param = navParams.get('data');
    this.createForm();
  }

  createForm() {
    this.itemForm = this.fb.group({
      name: this.param ? this.param.Name : '',
      description: this.param ? this.param.Description : '',
      important: this.param ? this.param.Important : false,
      favorite: this.param ? this.param.Favorite : false
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingitemPage');
  }
  dismiss() {
    if (this.itemForm.dirty)
      this.viewCtrl.dismiss(this.itemForm.value);
    else
      this.viewCtrl.dismiss();
  }
}

import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'page-shoppingitem',
  templateUrl: 'shoppingitem.html',
})
export class ShoppingItemPage {
  myParam: string;

  itemForm: FormGroup;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder) {
    this.myParam = navParams.get('myParam');
    this.createForm();
  }

  createForm() {
    this.itemForm = this.fb.group({
      name: '',
      description: '',
      important: false,
      favorite: false
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

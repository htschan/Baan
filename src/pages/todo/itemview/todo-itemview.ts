import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Todo } from '../../../model/todo';


@Component({
  selector: 'page-todo-itemview',
  templateUrl: 'todo-itemview.html',
})
export class TodoItemviewPage {
  param: Todo;

  itemForm: FormGroup;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder) {
    this.param = navParams.get('data');
    this.createForm();
  }

  createForm() {
    this.itemForm = this.fb.group({
      title: this.param ? this.param.title : '',
      comment: this.param ? this.param.comment : '',
      finished: false
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoItemviewPage');
  }
  dismiss() {
    if (this.itemForm.dirty)
      this.viewCtrl.dismiss(this.itemForm.value);
    else
      this.viewCtrl.dismiss();
  }
}

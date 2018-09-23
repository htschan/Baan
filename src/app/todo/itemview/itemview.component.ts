import { Component, OnInit } from '@angular/core';
import { Todo } from '../../../model/todo';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-itemview',
  templateUrl: './itemview.component.html',
  styleUrls: ['./itemview.component.scss']
})
export class ItemviewComponent {
  param: Todo;

  itemForm: FormGroup;

  constructor(public modalCtrl: ModalController, public params: NavParams, private fb: FormBuilder) {
    this.param = params.data as Todo;
    this.createForm();
  }

  createForm() {
    this.itemForm = this.fb.group({
      title: this.param ? this.param.title : '',
      comment: this.param ? this.param.comment : '',
      finished: false
    });
  }

  dismiss() {
    if (this.itemForm.dirty) {
      this.modalCtrl.dismiss(this.itemForm.value);
    } else {
      this.modalCtrl.dismiss();
    }
  }
}

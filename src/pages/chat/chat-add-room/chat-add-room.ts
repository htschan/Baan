import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

const FbBase = "/MyHome";

@Component({
  selector: 'page-chat-add-room',
  templateUrl: 'chat-add-room.html',
})
export class ChatAddRoomPage {

  data = { roomname: '' };
  ref: AngularFireList<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase) {
    this.ref = af.list(`${FbBase}/Chatrooms/`);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRoomPage');
  }

  addRoom() {
    this.ref.push({
      roomname: this.data.roomname
    });
    this.navCtrl.pop();
  }
}

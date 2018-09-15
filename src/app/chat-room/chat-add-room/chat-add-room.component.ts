import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { NavController } from '@ionic/angular';

const FbBase = '/MyHome';

@Component({
  selector: 'app-chat-add-room',
  templateUrl: './chat-add-room.component.html',
  styleUrls: ['./chat-add-room.component.scss']
})
export class ChatAddRoomComponent {

  data = { roomname: '' };
  ref: AngularFireList<any>;

  constructor(private location: Location, public af: AngularFireDatabase) {
    this.ref = af.list(`${FbBase}/Chatrooms/`);
  }

  addRoom() {
    this.ref.push({
      roomname: this.data.roomname
    });
    this.location.back();
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }
}

import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { APP_CONFIG_DI } from '../../../myhomeappconfig';
import { IAppConfig } from '../../shared/IAppConfig';


@Component({
  selector: 'app-chat-add-room',
  templateUrl: './chat-add-room.component.html',
  styleUrls: ['./chat-add-room.component.scss']
})
export class ChatAddRoomComponent {

  data = { roomname: '' };
  ref: AngularFireList<any>;

  constructor(@Inject(APP_CONFIG_DI) private appConfig: IAppConfig, private location: Location, public af: AngularFireDatabase) {
    this.ref = af.list(`${appConfig.FbBase}/Chatrooms/`);
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

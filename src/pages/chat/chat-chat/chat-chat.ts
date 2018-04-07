import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

const FbBase = "/MyHome";

@Component({
  selector: 'page-chat-chat',
  templateUrl: 'chat-chat.html',
})
export class ChatChatPage {
  @ViewChild(Content) content: Content;

  data = { type: '', nickname: '', message: '' };
  chats: Observable<any[]>;
  roomkey: string;
  nickname: string;
  offStatus: boolean = false;
  ref: AngularFireList<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase) {
    this.roomkey = this.navParams.get("key") as string;
    this.nickname = this.navParams.get("nickname") as string;
    this.data.type = 'message';
    this.data.nickname = this.nickname;
    this.ref = af.list(`${FbBase}/Chatrooms/`);

    let joinData = af.list(`${FbBase}/Chatrooms/${this.roomkey}/chats`).push({});
    joinData.set({
      type: 'join',
      user: this.nickname,
      message: this.nickname + ' has joined this room.',
      sendDate: Date()
    });

    this.data.message = '';

    this.chats = af.list(`${FbBase}/Chatrooms/${this.roomkey}/chats`).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  sendMessage() {
    let newData = this.af.list(`${FbBase}/Chatrooms/${this.roomkey}/chats`).push({});
    newData.set({
      type: this.data.type,
      user: this.data.nickname,
      message: this.data.message,
      sendDate: Date()
    });
    this.data.message = '';
  }

  exitChat() {
    let exitData = this.af.list(`${FbBase}/Chatrooms/${this.roomkey}/chats`).push({});
    exitData.set({
      type: 'exit',
      user: this.nickname,
      message: this.nickname + ' has exited this room.',
      sendDate: Date()
    });
    this.offStatus = true;

    this.navCtrl.setRoot("ChatRoomPage", {
      nickname: this.nickname
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Content } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

const FbBase = '/MyHome';

@Component({
  selector: 'app-chat-chat',
  templateUrl: './chat-chat.component.html',
  styleUrls: ['./chat-chat.component.scss']
})
export class ChatChatComponent {
  @ViewChild(Content) content: Content;

  data = { type: '', nickname: '', message: '' };
  chats: Observable<any[]>;
  roomkey: string;
  nickname: string;
  offStatus = false;
  ref: AngularFireList<any>;

  constructor(private router: Router, private location: Location, private activatedRoute: ActivatedRoute, public af: AngularFireDatabase) {
    this.roomkey = this.activatedRoute.snapshot.paramMap.get('key') as string;
    this.nickname = this.activatedRoute.snapshot.paramMap.get('nickname') as string;
    this.data.type = 'message';
    this.data.nickname = this.nickname;
    this.ref = af.list(`${FbBase}/Chatrooms/`);

    const joinData = af.list(`${FbBase}/Chatrooms/${this.roomkey}/chats`).push({});
    joinData.set({
      type: 'join',
      user: this.nickname,
      message: this.nickname + ' has joined this room.',
      sendDate: Date()
    });

    this.data.message = '';

    this.chats = af.list(`${FbBase}/Chatrooms/${this.roomkey}/chats`).snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }));
  }

  sendMessage() {
    const newData = this.af.list(`${FbBase}/Chatrooms/${this.roomkey}/chats`).push({});
    newData.set({
      type: this.data.type,
      user: this.data.nickname,
      message: this.data.message,
      sendDate: Date()
    });
    this.data.message = '';
  }

  exitChat() {
    const exitData = this.af.list(`${FbBase}/Chatrooms/${this.roomkey}/chats`).push({});
    exitData.set({
      type: 'exit',
      user: this.nickname,
      message: this.nickname + ' has exited this room.',
      sendDate: Date()
    });
    this.offStatus = true;

    this.router.navigate(['ChatRoomPage', {
      nickname: this.nickname
    }]);
  }
}

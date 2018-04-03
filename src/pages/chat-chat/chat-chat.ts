import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

const FbBase = "/MyHome";

@IonicPage()
@Component({
  selector: 'page-chat-chat',
  templateUrl: 'chat-chat.html',
})
export class ChatChatPage {
  @ViewChild(Content) content: Content;

  data = { type:'', nickname:'', message:'' };
  chats = [];
  roomkey:string;
  nickname:string;
  offStatus:boolean = false;
  ref: AngularFireList<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase) {
    this.roomkey = this.navParams.get("key") as string;
    this.nickname = this.navParams.get("nickname") as string;
    this.data.type = 'message';
    this.data.nickname = this.nickname;
    this.ref = af.list(`${FbBase}/Chatrooms/`);
/*
    let joinData = this.af.firebase.database().ref('Chatrooms/'+this.roomkey+'/chats').push();
    joinData.set({
      type:'join',
      user:this.nickname,
      message:this.nickname+' has joined this room.',
      sendDate:Date()
    });
    */
    this.data.message = '';
/*
    firebase.database().ref('Chatrooms/'+this.roomkey+'/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
        if(this.offStatus === false) {
          this.content.scrollToBottom(300);
        }
      }, 1000);
    });
    */
  }

  sendMessage() {
    /*
    let newData = firebase.database().ref('Chatrooms/'+this.roomkey+'/chats').push();
    newData.set({
      type:this.data.type,
      user:this.data.nickname,
      message:this.data.message,
      sendDate:Date()
    });
    */
    this.data.message = '';
  }

  exitChat() {
    /*
    let exitData = firebase.database().ref('Chatrooms/'+this.roomkey+'/chats').push();
    exitData.set({
      type:'exit',
      user:this.nickname,
      message:this.nickname+' has exited this room.',
      sendDate:Date()
    });
*/
    this.offStatus = true;

    this.navCtrl.setRoot("ChatRoomPage", {
      nickname:this.nickname
    });
  }


}


export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};
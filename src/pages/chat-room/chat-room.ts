import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';

const FbBase = "/MyHome";

@IonicPage()
@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {

  rooms: Observable<any[]>;
  ref: AngularFireList<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase, public authService: AuthService) {
    this.ref = af.list(`${FbBase}/Chatrooms/`);
    this.rooms = this.ref.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
  }

  addRoom() {
    this.navCtrl.push("ChatAddRoomPage");
  }

  joinRoom(key) {
    this.navCtrl.setRoot("ChatChatPage", {
      key: key,
      nickname: this.authService.currentUser.displayName || "<undefined>"
    });
  }

  gotoRoot() {
    this.navCtrl.popAll();
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { APP_CONFIG_DI } from '../../myhomeappconfig';
import { IAppConfig } from '../shared/IAppConfig';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage {

  rooms: Observable<any[]>;
  ref: AngularFireList<any>;

  constructor(@Inject(APP_CONFIG_DI) private appConfig: IAppConfig,
    public router: Router,
    public route: ActivatedRoute,
    public af: AngularFireDatabase,
    public authService: AuthService) {
    this.ref = af.list(`${appConfig.FbBase}/Chatrooms/`);
    this.rooms = this.ref.snapshotChanges().pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }));
  }

  addRoom() {
    this.router.navigate(['addRoom'], { relativeTo: this.route });
  }

  joinRoom(key) {
    this.router.navigate(['chat', {
      key: key,
      nickname: this.authService.currentUser.displayName || '<undefined>'
    }], { relativeTo: this.route });
  }
}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatAddRoomPage } from './chat-add-room';

@NgModule({
  declarations: [
    ChatAddRoomPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatAddRoomPage),
  ],
})
export class ChatAddRoomPageModule {}

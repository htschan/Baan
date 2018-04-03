import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatChatPage } from './chat-chat';

@NgModule({
  declarations: [
    ChatChatPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatChatPage),
  ],
})
export class ChatChatPageModule {}

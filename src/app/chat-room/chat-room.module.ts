import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ChatRoomPage } from './chat-room.page';
import { ChatAddRoomComponent } from './chat-add-room/chat-add-room.component';
import { ChatChatComponent } from './chat-chat/chat-chat.component';

const routes: Routes = [
  {
    path: '',
    component: ChatRoomPage,
  },
  {
    path: 'addRoom',
    component: ChatAddRoomComponent
  },
  {
    path: 'chat',
    component: ChatChatComponent
  }
];

@NgModule({
  entryComponents: [
    ChatAddRoomComponent,
    ChatChatComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ChatRoomPage,
    ChatAddRoomComponent,
    ChatChatComponent
  ]
})
export class ChatRoomPageModule { }

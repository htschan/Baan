import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

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
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ChatRoomPage,
    ChatAddRoomComponent,
    ChatChatComponent
  ]
})
export class ChatRoomPageModule { }

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatRoomPage } from './chat-room';
import { ChatChatPage } from '../chat-chat/chat-chat';
import { ChatAddRoomPage } from '../chat-add-room/chat-add-room';

@NgModule({
    declarations: [
        ChatRoomPage,
        ChatChatPage,
        ChatAddRoomPage
    ],
    entryComponents: [
        ChatChatPage,
        ChatAddRoomPage
    ],
    imports: [
        IonicPageModule.forChild(ChatRoomPage)
    ],
})
export class ChatRoomPageModule { }

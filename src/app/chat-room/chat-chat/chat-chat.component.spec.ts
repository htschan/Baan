import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatChatComponent } from './chat-chat.component';

describe('ChatChatComponent', () => {
  let component: ChatChatComponent;
  let fixture: ComponentFixture<ChatChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

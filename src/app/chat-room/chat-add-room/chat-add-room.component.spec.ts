import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAddRoomComponent } from './chat-add-room.component';

describe('ChatAddRoomComponent', () => {
  let component: ChatAddRoomComponent;
  let fixture: ComponentFixture<ChatAddRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatAddRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatAddRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

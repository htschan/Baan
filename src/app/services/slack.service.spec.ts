import { TestBed, inject } from '@angular/core/testing';

import { SlackService } from './slack.service';

describe('Feedback Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlackService]
    });
  });

  it('should create service', inject([SlackService], (service: SlackService) => {
    expect(service).toBeTruthy();
  }));

  it('should post message to slack', inject([SlackService], (service: SlackService) => {
    // expect(service.getMeaning()).toBe(42);
  }));
});

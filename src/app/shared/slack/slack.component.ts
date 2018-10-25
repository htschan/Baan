import { Component, OnInit, ChangeDetectorRef, Injector, Input, Inject } from '@angular/core';
import { SlackService } from '../../services/slack.service';
import { IAppConfig } from '../IAppConfig';
import { APP_CONFIG_DI } from '../../../myhomeappconfig';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-slack',
  templateUrl: './slack.component.html',
  styleUrls: ['./slack.component.scss']
})
export class SlackComponent implements OnInit {
  closed = true;
  sent = false;
  sending = false;
  slackUrlToken: string;
  error;

  @Input() placeholder = 'Enter your feedback or question here';
  @Input() successMessage = 'Thank you for your Feedback!';
  @Input() buttonText = 'Send a Message';
  @Input() buttonTextSending = 'Sending..';
  @Input() messageTitle = 'Message from app';
  @Input() closeAfter = 2000;

  constructor(
    private fb: SlackService,
    private cd: ChangeDetectorRef,
    @Inject(APP_CONFIG_DI) private appConfig: IAppConfig) { }

  ngOnInit() {
    this.slackUrlToken = this.appConfig.SlackWebHookUrl;
  }

  toggle() {
    this.closed = !this.closed;

    if (this.sent) {
      this.sent = false;
    }
  }

  sendSlack(data: { feedback: string }) {

    this.sending = true;

    const slackObject = {
      text: data.feedback,
      'attachments': [
        {
          'title': this.messageTitle,
        },
      ]
    };

    this.fb.notifySlack(slackObject)
      .subscribe(() => {
        this.updateComponent();
      },
        error => this.error = error
      );
  }

  private updateComponent() {
    this.sent = true;
    this.sending = false;
    this.cd.markForCheck();
    setTimeout(() => {
      this.closed = true;
      this.cd.markForCheck();
    }, this.closeAfter);
  }
}

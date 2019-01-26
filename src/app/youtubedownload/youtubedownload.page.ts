import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { YoutubeService } from '../services/youtube.service';
import * as signalR from '@aspnet/signalr';
import { APP_CONFIG_DI } from '../../myhomeappconfig';
import { IAppConfig } from '../shared/IAppConfig';

@Component({
  selector: 'app-youtubedownload',
  templateUrl: './youtubedownload.page.html',
  styleUrls: ['./youtubedownload.page.scss'],
})
export class YoutubedownloadPage implements OnInit, OnDestroy {
  private _hubConnection: signalR.HubConnection | undefined;
  itemForm: FormGroup;
  messages: string[] = [];

  constructor(
    @Inject(APP_CONFIG_DI) private appConfig: IAppConfig,
    public tubeService: YoutubeService,
    private fb: FormBuilder,
    public loadingCtrl: LoadingController) {
    this.createForm();
  }

  ngOnInit() {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.appConfig.baanBackend.baanHub)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this._hubConnection.start().catch(err => console.error(err.toString()));

    this._hubConnection.on('DownloadNotify', (data: any) => {
      const received = `Downloaded: ${data.message}`;
      this.messages.push(received);
    });
  }

  ngOnDestroy() {
    this._hubConnection.stop().catch(err => console.error(err.toString()));
  }

  createForm() {
    this.itemForm = this.fb.group({
      key: '',
      url: ''
    });
  }

  async downloadAudio() {
    const loading = await this.loadingCtrl.create({
      message: 'Sende Auftrag...'
    });
    loading.present();
    this.tubeService.downloadAudio(this.itemForm.value.url).subscribe(
      data => {
        this.itemForm.patchValue({ url: '' });
        loading.dismiss();
      },
      err => { loading.dismiss(); }
    );
  }
}

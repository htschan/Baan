import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, timer } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { YoutubeService } from '../services/youtube.service';
import { timeInterval, pluck, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-youtubedownload',
  templateUrl: './youtubedownload.page.html',
  styleUrls: ['./youtubedownload.page.scss'],
})
export class YoutubedownloadPage implements OnInit, OnDestroy {
  unsubscribe: Subject<string> = new Subject();
  timerSubscription: Subscription;
  timer;
  queuedTracks: any;
  itemForm: FormGroup;

  constructor(
    public tubeService: YoutubeService,
    private fb: FormBuilder,
    public loadingCtrl: LoadingController) {
    this.createForm();
  }

  ngOnInit() {
    this.refreshQueuedTracks();
    const source = timer(2000, 1000);
    this.timerSubscription = source.subscribe(t => {
      this.refreshQueuedTracks();
    });

    this.tubeService.queuedtracks.pipe(takeUntil(this.unsubscribe))
      .subscribe(data => {
        this.queuedTracks = data;
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.timerSubscription.unsubscribe();
  }

  createForm() {
    this.itemForm = this.fb.group({
      key: '',
      url: ''
    });
  }

  async downloadAudio() {
    console.log('downloadAudio');
    const loading = await this.loadingCtrl.create({
      message: 'Sende Auftrag...'
    });
    this.tubeService.downloadAudio(this.itemForm.value.url).subscribe(
      data => {
        this.itemForm.patchValue({ url: '' });
        loading.dismiss();
      },
      err => { loading.dismiss(); }
    );
  }

  refreshQueuedTracks() {
    this.tubeService.updateQueuedTracks()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { YoutubeService } from '../../services/youtube.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

@Component({
  selector: 'page-youtubedownload',
  templateUrl: 'youtubedownload.html',
})
export class YoutubedownloadPage implements OnInit, OnDestroy {
  unsubscribe: Subject<string> = new Subject();
  timerSubscription: Subscription;
  timer;
  queuedTracks: any;
  itemForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public tubeService: YoutubeService,
    private fb: FormBuilder,
    public loadingCtrl: LoadingController) {
    this.createForm();
  }

  ngOnInit() {
    this.refreshQueuedTracks();
    let timer = TimerObservable.create(2000, 1000);
    this.timerSubscription = timer.subscribe(t => {
      this.refreshQueuedTracks();
    });

    this.tubeService.queuedtracks.takeUntil(this.unsubscribe)
      .subscribe(data => {
        this.queuedTracks = data;
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.timerSubscription.unsubscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YoutubedownloadPage');
  }

  createForm() {
    this.itemForm = this.fb.group({
      key: '',
      url: ''
    });
  }

  downloadAudio() {
    console.log("downloadAudio");
    let loading = this.loadingCtrl.create({
      content: 'Sende Auftrag...'
    });
    this.tubeService.downloadAudio(this.itemForm.value.url).subscribe(
      data => {
        this.itemForm.patchValue({ url: "" });
        loading.dismiss();
      },
      err => { loading.dismiss }
    );
  }

  refreshQueuedTracks() {
    this.tubeService.updateQueuedTracks()
      .takeUntil(this.unsubscribe)
      .subscribe();
  }
}

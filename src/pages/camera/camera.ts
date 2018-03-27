import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
https://blog.cloudboost.io/capturing-camera-using-angular-5-2e177c68201f
*/

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
  @ViewChild('videoElement') videoElement: any;
  video: any;
  isPlaying = false;

  displayControls = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

  ngOnInit() {
    this.video = this.videoElement.nativeElement;
  }

  start() {
    this.initCamera({ video: true, audio: false });
  }

  pause() {
    this.video.pause();
  }

  toggleControls() {
    this.video.controls = this.displayControls;
    this.displayControls = !this.displayControls;
  }

  resume() {
    this.video.play();
  }

  sound() {
    this.initCamera({ video: true, audio: true });
  }

  initCamera(config: any) {
    var browser = <any>navigator;

    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    browser.mediaDevices.getUserMedia(config).then(stream => {
      this.video.src = window.URL.createObjectURL(stream);
      this.video.play();
    });
  }
}

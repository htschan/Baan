import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { YoutubeService } from '../../services/youtube.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'page-youtubedownload',
  templateUrl: 'youtubedownload.html',
})
export class YoutubedownloadPage {
  itemForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public tubeService: YoutubeService, private fb: FormBuilder) {
    this.createForm();
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
    this.tubeService.downloadAudio(this.itemForm.value.url).subscribe(
      m => {
        console.log(m);
      }
    );
  }

}

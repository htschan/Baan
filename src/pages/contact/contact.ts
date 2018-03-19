import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { YoutubeService } from '../../services/youtube.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  itemForm: FormGroup;

  message = "empty";

  constructor(public navCtrl: NavController, public http: Http, public tubeService: YoutubeService, private fb: FormBuilder) {
    this.createForm();
    http.get('https://us-central1-myhome-c5350.cloudfunctions.net/helloWorld')
      .subscribe((data) => {
        console.log('data', data);
        this.message = data.json().text;
      })
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

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  message = "empty";

  constructor(public navCtrl: NavController, public http: Http) {
    http.get('https://us-central1-myhome-c5350.cloudfunctions.net/helloWorld')
      .subscribe((data) => {
        console.log('data', data);
        this.message = data.json().text;
      })
  }
}

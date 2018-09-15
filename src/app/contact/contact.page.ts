import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage {

  message = 'empty';

  constructor(private http: HttpClient) {
    http.get('https://us-central1-myhome-c5350.cloudfunctions.net/helloWorld')
      .subscribe((data: any) => {
        console.log('data', data.text);
        this.message = data.text;
      });
  }
}

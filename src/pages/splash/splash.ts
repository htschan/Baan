import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
  animations: [
    trigger('myAwesomeAnimation', [
      state('small', style({
        transform: 'scale(1)',
      })),
      state('large', style({
        transform: 'scale(1.8)',
      })),
      // transition('small => large', animate('300ms ease-in', style({ transform: 'translateY(40px)' }))),
      transition('small <=> large', animate('300ms ease-in', keyframes([
        style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
        style({ opacity: 1, transform: 'translateY(35px)', offset: 0.5 }),
        style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
      ]))),
    ]),
    trigger('animColorHexagon', [
      state('startColor', style({
//        transform: 'scale(1)',
        fill: '#2daae1'
      })),
      state('endColor', style({
        // transform: 'scale(1.8)',
        fill: '#FDDB37'
      })),
      transition('startColor => endColor', animate('300ms ease-in', style({ fill: '#FDDB37' }))),
    ]),
  ]
})
export class SplashPage {

  constructor(public viewCtrl: ViewController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');
  }

  ionViewDidEnter() {

    this.animateMe();

    setTimeout(() => {
      this.viewCtrl.dismiss();
    }, 4000);

  }

  state: string = 'small';
  stateColor: string = 'startColor';

  animateMe() {
    // this.state = (this.state === 'small' ? 'large' : 'small');
    this.stateColor = (this.stateColor === 'startColor' ? 'endColor' : 'startColor');
  }
}

import { Component, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MotionService } from '../../services/motion.service';


@IonicPage()
@Component({
  selector: 'page-motion',
  templateUrl: 'motion.html',
})
export class MotionPage {

  // Acceleration
  yacc: any;
  xacc: any;
  zacc: any;
  // Acceleration Gravity
  yg: any;
  xg: any;
  zg: any;
  // Rotation rate
  alpha: any;
  beta: any;
  gamma: any;

  interval: any;

  supported: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public motionService: MotionService) {
    if (!window.DeviceMotionEvent) {
      this.supported = "DeviceMotionEvent not supported on this platform";
    } else {
      this.supported = "ok ";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MotionPage');
  }

  @HostListener('window:devicemotion', ['$event'])
  devicemotion(ev: DeviceMotionEvent) {
    // do something meaningful with it
    console.log(`The devicemotion event ${ev}!`);
    this.xacc = ev.acceleration.x;
    this.yacc = ev.acceleration.y;
    this.zacc = ev.acceleration.z;

    this.xg = ev.accelerationIncludingGravity.x;
    this.yg = ev.accelerationIncludingGravity.y;
    this.zg = ev.accelerationIncludingGravity.z;

    this.alpha = ev.rotationRate.alpha;
    this.beta = ev.rotationRate.beta;
    this.gamma = ev.rotationRate.gamma;

    this.interval = ev.interval;
  }


}

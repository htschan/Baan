import { Component, HostListener } from '@angular/core';
import { MotionService } from '../services/motion.service';

@Component({
  selector: 'app-motion',
  templateUrl: './motion.page.html',
  styleUrls: ['./motion.page.scss'],
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

  constructor(public motionService: MotionService) {
    // if (!window.DeviceMotionEvent) {
    //   this.supported = "DeviceMotionEvent not supported on this platform";
    // } else {
    //   this.supported = "ok ";
    // }
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

import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { TabsPage } from '../pages/tabs/tabs';
import { SplashPage } from '../pages/splash/splash';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = null;

  constructor(platform: Platform, statusBar: StatusBar, modalCtrl: ModalController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      let splash = modalCtrl.create(SplashPage);
      splash.present();

      setTimeout(() => {
        this.rootPage = TabsPage;
      }, 1000);
    });
  }
}

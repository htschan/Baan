import { Component, OnInit } from '@angular/core';
import { Events, ModalController, PopoverController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { NavGuard } from '../support/nav.guard';
import { AuthService } from '../../services/auth.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends NavGuard implements OnInit, OnDestroy {

  displayName;

  constructor(
    public auth: AuthService,
    public appCtrl: App,
    public modalCtrl: ModalController,
    public events: Events,
    public popoverCtrl: PopoverController) {
    super(auth, modalCtrl, appCtrl);
    events.subscribe('user:signout', (user) => {
      console.log("home.component user logged out");
    });
    events.subscribe('user:signin', (user) => {
      console.log("home.component user signed in");
      this.displayName = user.displayName;
    });
    console.dir(AuthService);
  }

  ngOnInit(): void {
    console.log("Home on init");
  }

  ngOnDestroy(): void {
    this.events.unsubscribe('user:signout');
    this.events.unsubscribe('user:signin');
  }
}

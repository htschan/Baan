import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage {

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    public auth: AuthService) {
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['home']);
    });
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}

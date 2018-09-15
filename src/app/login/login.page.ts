import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LayoutService } from '../services/layout.service';
import { ToastController, AlertController, LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loading: any;
  title: String = ' ';
  registerCredentials = { 'email': 'a@sorawit.ch', 'password': '' };

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    public auth: AuthService,
    public layoutService: LayoutService,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {
    this.layoutService.hideSplitPane();
  }

  public createAccount() {
    // this.navCtrl.push(RegisterPage);
  }

  signInWithFacebook() {
    this.auth.facebookLogin().then(() => {
      // tslint:disable-next-line:quotemark
      console.log("login facebook logged in");
      this.gotoHomePage();
    });
  }

  signInWithTwitter() {
    this.auth.twitterLogin().then(() => {
      console.log('login twitter logged in');
      this.gotoHomePage();
    });
  }

  signInWithGoogle() {
    this.auth.googleLogin().then(() => {
      console.log('login google logged in');
      this.gotoHomePage();
    });
  }

  login() {
    this.auth.emailLogin(this.registerCredentials.email, this.registerCredentials.password).then(() => {
      console.log('login email/password logged in');
      this.gotoHomePage();
    });
  }

  cancel() {
    this.modalCtrl.dismiss(false);
  }

  async help() {
    const toast = await this.toastCtrl.create({
      message: 'Einfach Login drücken !'
    });
    toast.present();
  }

  gotoHomePage() {
    this.layoutService.unHideSplitPane();
    this.router.navigate(['home']);
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 2000
    });
    return await this.loading.present();
  }

  async showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    const alert = await this.alertCtrl.create({
      header: 'Fail',
      subHeader: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
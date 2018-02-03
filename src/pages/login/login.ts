import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController, Loading, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  title: String = ' ';
  loading: Loading;
  registerCredentials = { "email": "demo@xxxx.ch", "password": "" };

  constructor(public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public createAccount() {
    // this.navCtrl.push(RegisterPage);
  }

  signInWithFacebook() {
    this.auth.facebookLogin();
  }

  signInWithTwitter() {
    this.auth.twitterLogin();
  }

  signInWithGoogle() {
    this.auth.googleLogin();
  }

  login() {
    //this.showLoading();
    this.auth.facebookLogin();
  }

  cancel() {
    this.viewCtrl.dismiss(false);
  }

  help() {
    this.toastCtrl.create({ message: "Einfach Login drücken !", duration: 3000, position: "top" }).present();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}

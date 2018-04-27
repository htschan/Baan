import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController, Loading, LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { HomePage } from '../home/home';
import { LayoutService } from '../../services/layout.service';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  title: String = ' ';
  loading: Loading;
  registerCredentials = { "email": "a@sorawit.ch", "password": "" };

  constructor(public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService,
    public layoutService: LayoutService,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewWillEnter() {
    this.layoutService.hideSplitPane();
  }

  public createAccount() {
    // this.navCtrl.push(RegisterPage);
  }

  signInWithFacebook() {
    this.auth.facebookLogin().then(() => {
      console.log("login facebook logged in");
      this.gotoHomePage();
    });
  }

  signInWithTwitter() {
    this.auth.twitterLogin().then(() => {
      console.log("login twitter logged in");
      this.gotoHomePage();
    });
  }

  signInWithGoogle() {
    this.auth.googleLogin().then(() => {
      console.log("login google logged in");
      this.gotoHomePage();
    });
  }

  login() {
    this.auth.emailLogin(this.registerCredentials.email, this.registerCredentials.password).then(() => {
      console.log("login email/password logged in");
      this.gotoHomePage();
    });
  }

  cancel() {
    this.viewCtrl.dismiss(false);
  }

  help() {
    this.toastCtrl.create({ message: "Einfach Login drücken !", duration: 3000, position: "top" }).present();
  }

  gotoHomePage() {
    this.layoutService.unHideSplitPane();
    this.navCtrl.setRoot(HomePage);
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

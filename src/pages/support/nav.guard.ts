import { LoginPage } from "../login/login";
import { AuthService } from "../../services/auth.service";
import { App } from 'ionic-angular';

export class NavGuard {
    _guardCandidate = true;

    constructor(
        public auth: AuthService,
        public appCtrl: App) {
    }

    async ionViewCanEnter() {
        return this.auth.isAuthenticated().then(authenicated => {
            if (authenicated) {
                console.log("ionViewCanEntger authenticated");
                return true;
            }
            else
                return this.login();
        })
    }

    async login() {
        console.log("nav.guard login");
        this.appCtrl.getRootNav().push(LoginPage);
        return Promise.resolve(false);
    }

    // ionViewWillEnter() {
    //   this.auth.getAuthenticated().then(loggedIn => {
    //     if (!loggedIn) {
    //       let modal = this.modalCtrl.create(LoginPage);
    //       modal.onDidDismiss(data => {
    //         if (data === false) {
    //           this.navCtrl.pop();
    //         }
    //       });
    //       modal.present();
    //     } else {
    //       if ( this.cosmi.selectedCandidate === undefined){
    //         this.presentAlert();
    //         this.navCtrl.pop();
    //       }
    //     }

    //   })
    // }

}
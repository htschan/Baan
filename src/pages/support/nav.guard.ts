import { ModalController, AlertController } from "ionic-angular";
import { LoginPage } from "../login/login";
import { AuthService } from "../../services/auth.service";

export class NavGuard {
    _guardCandidate = true;

    constructor(
        public auth: AuthService,
        public modalCtrl: ModalController,
        public alertCtrl: AlertController) {
    }

    async ionViewCanEnter() {
        return this.auth.isAuthenticated().then(authenicated => {
            if (authenicated)
                return true;
            else
                return this.login();
        })
        // if (this._user === null) {
        //     return new Promise<boolean>((resolve, reject) => this.auth.authState.subscribe(user => {
        //         if (user === null)
        //             resolve(this.login());
        //         else
        //             resolve(true);
        //     }));
        // }
        // return true;
    }

    async login() {
        return new Promise<boolean>((resolve, reject) => {
            let modal = this.modalCtrl.create(LoginPage);
            modal.present();
            modal.onDidDismiss(data => {
                resolve(data);
            });
        });
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
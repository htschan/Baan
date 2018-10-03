import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '@firebase/auth-types';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { auth } from 'firebase/app';
import * as firebase from 'firebase/app';
import { take, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { DbService } from './db.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';
import { AppConfig } from '../../myhomeappconfig';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  _user: User = null;

  constructor(private afAuth: AngularFireAuth,
    private db: DbService,
    private router: Router,
    private gplus: GooglePlus,
    private platform: Platform,
    private storage: Storage,
    private loadingController: LoadingController,
    public events: Events) {

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => (user ? db.doc$(`users/${user.uid}`) : of(null))),
      tap(user => {
        console.log(user ? user.id : 'not logged in');
      })
    );

    this.handleRedirect();
  }

  uid() {
    return this.user$
      .pipe(
        take(1),
        tap(user => {
          console.log(user ? user.id : 'not logged in');
        }),
        map(u => u && u.uid)
      )
      .toPromise();
  }

  setRedirect(val) {
    this.storage.set('authRedirect', val);
  }

  async isRedirect() {
    return await this.storage.get('authRedirect');
  }

  setReturnUrl(val) {
    this.storage.set('returnUrl', val);
  }

  async getReturnUrl() {
    return await this.storage.get('returnUrl');
  }

  async googleLogin(returnUrl: string) {
    try {
      let user;
      this.setReturnUrl(returnUrl);
      if (this.platform.is('cordova')) {
        user = await this.nativeGoogleLogin();
      } else {
        await this.setRedirect(true);
        const provider = new auth.GoogleAuthProvider();
        user = await this.afAuth.auth.signInWithRedirect(provider);
      }
      return await this.updateUserData(user);
    } catch (err) {
      console.log(err);
    }
  }

  async nativeGoogleLogin(): Promise<any> {
    const gplusUser = await this.gplus.login({
      webClientId: AppConfig.googlePlus.webClientId,
      offline: true,
      scopes: 'profile email'
    });

    return await this.afAuth.auth.signInWithCredential(
      auth.GoogleAuthProvider.credential(gplusUser.idToken)
    );
  }

  // Handle login with redirect for web Google auth
  private async handleRedirect() {
    if ((await this.isRedirect()) !== true) {
      return null;
    }
    const loading = await this.loadingController.create();
    await loading.present();

    const result = await this.afAuth.auth.getRedirectResult();

    if (result.user) {
      await this.updateUserData(result.user);
    }

    await loading.dismiss();

    await this.setRedirect(false);

    const returnUrl = await this.getReturnUrl();
    await this.router.navigate([returnUrl]);

    return result;
  }

  async anonymousLogin() {
    const credential = await this.afAuth.auth.signInAnonymously();
    return await this.updateUserData(credential.user);
  }

  async signOut(): Promise<any> {
    // this.events.publish('user:signout', this._user);
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData({ uid, email, displayName, photoURL, isAnonymous }) {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features
    const path = `users/${uid}`;
    const data = {
      uid,
      email,
      displayName,
      photoURL,
      isAnonymous
    };

    return this.db.updateAt(path, data);

    // if (this._user === null) {
    //   return;
    // }

    // const path = `MyHome/Profiles/${this.currentUserId}`; // Endpoint on firebase
    // const data = {
    //   name: this.currentUser.displayName,
    //   email: this.currentUser.email,
    // };

    // this.db.object(path).update(data)
    //   .catch(error => console.log(error));
  }





  // Returns true if user is logged in
  get authenticated(): boolean {
    return this._user !== null;
  }

  // Returns current user
  get currentUser(): User | null {
    return this.authenticated ? this._user : null;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this._user.uid : '';
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this._user.isAnonymous : false;
  }

  async isAuthenticated(): Promise<boolean> {
    if (this._user === null) {
      return new Promise<boolean>((resolve, reject) =>
        this.afAuth.authState.subscribe(user => {
          resolve(user !== null);
        }));
    }
    return true;
  }

  githubLogin(): Promise<any> {
    return this.socialSignIn(new firebase.auth.GithubAuthProvider());
  }

  // googleLogin(): Promise<any> {
  //   return this.socialSignIn(new firebase.auth.GoogleAuthProvider());
  // }

  facebookLogin(): Promise<any> {
    return this.socialSignIn(new firebase.auth.FacebookAuthProvider());
  }

  twitterLogin(): Promise<any> {
    return this.socialSignIn(new firebase.auth.TwitterAuthProvider());
  }

  private async socialSignIn(provider: any): Promise<any> {
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return await this.updateUserData(credential.user);
  }

  async emailSignUp(email: string, password: string): Promise<any> {
    const credential = await this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password);
    return await this.updateUserData(credential.user);
  }

  async emailLogin(email: string, password: string): Promise<any> {
    const credential = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    return await this.updateUserData(credential.user);
  }
}

import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { auth, User } from 'firebase/app';
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
  user$: Observable<User>;
  currentUser: User;

  constructor(private afAuth: AngularFireAuth,
    private db: DbService,
    private router: Router,
    private gplus: GooglePlus,
    private platform: Platform,
    private storage: Storage,
    private loadingController: LoadingController,
    public events: Events) {

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => (user ? db.doc$(`users/${user.uid}`) : of(null)))
    );

    this.handleRedirect();
  }

  uid() {
    return this.user$
      .pipe(
        take(1),
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

  async setReturnUrl(val) {
    this.storage.set('returnUrl', val);
  }

  async getReturnUrl() {
    return await this.storage.get('returnUrl');
  }

  async anonymousLogin() {
    const credential = await this.afAuth.auth.signInAnonymously();
    return await this.updateUserData(credential);
  }

  async emailSignUp(email: string, password: string): Promise<any> {
    const credential = await this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password);
    return await this.updateUserData(credential);
  }

  async emailLogin(email: string, password: string): Promise<any> {
    const credential = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    return await this.updateUserData(credential);
  }

  googleLogin() {
    return this.socialSignIn(new auth.GoogleAuthProvider());
  }

  githubLogin() {
    return this.socialSignIn(new auth.GithubAuthProvider());
  }

  facebookLogin() {
    return this.socialSignIn(new auth.FacebookAuthProvider());
  }

  twitterLogin() {
    return this.socialSignIn(new auth.TwitterAuthProvider());
  }

  private async socialSignIn(provider: any): Promise<any> {
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    await this.updateUserData(credential);
    const result = await this.getReturnUrl();
    return this.router.navigateByUrl(`${result}`);
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

    const credential = await this.afAuth.auth.getRedirectResult();

    if (credential.user) {
      await this.updateUserData(credential);
    }

    await loading.dismiss();

    await this.setRedirect(false);

    const returnUrl = await this.getReturnUrl();
    await this.router.navigate([returnUrl]);

    return credential;
  }

  async signOut(): Promise<any> {
    await this.afAuth.auth.signOut();
  }

  private updateUserData(cred: auth.UserCredential) {
    const path = `users/${cred.user.uid}`;
    const data = {
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: cred.user.displayName,
      photoURL: cred.user.photoURL,
      isAnonymous: cred.user.isAnonymous,
      providerId: cred.additionalUserInfo.providerId
    };
    this.currentUser = data as User;
    return this.db.updateAt(path, data);
  }
}

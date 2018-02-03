import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '@firebase/auth-types';

import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

    _user: User = null;

    constructor(private afAuth: AngularFireAuth,
        private db: AngularFireDatabase) {

        afAuth.authState.subscribe((auth) => {
            this._user = auth;
        });
    }

    // Returns true if user is logged in
    get authenticated(): boolean {
        return this.afAuth.authState !== null;
    }

    // Returns current user
    get currentUser(): any {
        return this.authenticated ? this._user : null;
    }

    // Returns current user UID
    get currentUserId(): string {
        return this.authenticated ? this._user.uid : '';
    }

    // Anonymous User
    get currentUserAnonymous(): boolean {
        return this.authenticated ? this._user.isAnonymous : false
    }

    async isAuthenticated(): Promise<boolean> {
        if (this._user === null) {
            return new Promise<boolean>((resolve, reject) => this.afAuth.authState.subscribe(user => {
                resolve(user !== null);
            }));
        }
        return true;
    }
    //// Social Auth ////

    githubLogin(): Promise<any> {
        return this.socialSignIn(new firebase.auth.GithubAuthProvider());
    }

    googleLogin(): Promise<any> {
        return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    facebookLogin(): Promise<any> {
        return this.socialSignIn(new firebase.auth.FacebookAuthProvider());
    }

    twitterLogin(): Promise<any> {
        return this.socialSignIn(new firebase.auth.TwitterAuthProvider());
    }

    private socialSignIn(provider: any): Promise<any> {
        return this.afAuth.auth.signInWithPopup(provider)
            .then(() => this.updateUserData())
            .catch(error => console.log(error));
    }

    //// Anonymous Auth ////

    anonymousLogin() {
        return this.afAuth.auth.signInAnonymously()
            .then(() => this.updateUserData())
            .catch(error => console.log(error));
    }


    //// Email/Password Auth ////

    emailSignUp(email: string, password: string): Promise<any> {
        return this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password)
            .then(() => this.updateUserData())
            .catch(error => console.log(error));
    }

    emailLogin(email: string, password: string): Promise<any> {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then(() => this.updateUserData())
            .catch(error => console.log(error));
    }

    //// Sign Out ////

    signOut(): void {
        this.afAuth.auth.signOut();
    }


    //// Helpers ////

    private updateUserData(): void {
        // Writes user name and email to realtime db
        // useful if your app displays information about users or for admin features

        let path = `MyHome/Profiles/${this.currentUserId}`; // Endpoint on firebase
        let data = {
            name: this.currentUser.displayName,
            email: this.currentUser.email,
        }

        this.db.object(path).update(data)
            .catch(error => console.log(error));

    }
}
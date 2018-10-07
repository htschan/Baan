import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private toastController: ToastController) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.auth.user$.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log(`access denied to ${state.url}`);
          this.presentToast();
          this.auth.setReturnUrl(state.url);
          this.router.navigate(['Profil']);
        }
      }));
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Bitte zuerst anmelden.',
      position: 'middle',
      cssClass: 'toast',
      duration: 2000
    });
    toast.present();
  }
}

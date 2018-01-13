import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { ProductService, ShoppingItem } from '../../services/product.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: ShoppingItem[] = [];
  displayName;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private prodService: ProductService) {
    afAuth.authState.subscribe(user => {
      if (!user) {
        this.displayName = null;
        return;
      }
      this.displayName = user.displayName;
    });
    prodService.getShoppinglist().subscribe(data => this.items = Object.assign(data));

  }

  addItem() {
    this.items.push(Object.assign({ Name: "sdfsdf" }));
  }

  signInWithFacebook() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => console.log(res));
  }

  signOut() {
    this.afAuth.auth.signOut();
  }
}

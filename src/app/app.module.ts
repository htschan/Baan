import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppConfig } from '../myhomeappconfig';
import { BUILD_INFO } from './services/product.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';

/*
export class AppConfig {
  static firebaseConfig: any = {
    apiKey: "AUlj8AHNöiet12UXBjaZUTsalDBHD67D-HqaHgl",
    authDomain: "aaaaaa-r7364.firebaseapp.com",
    databaseURL: "https://aaaaaa-r7364.firebaseio.com",
    projectId: "myproj-f3489",
    storageBucket: "aaaaaa-r7364.appspot.com",
    messagingSenderId: "234972364927"
  };
}
*/

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(AppConfig.firebaseConfig),
    SharedModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    Firebase,
    GooglePlus,
    StatusBar,
    SplashScreen,
    { provide: BUILD_INFO, useValue: AppConfig.appConfig.bts },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

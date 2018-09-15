import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GeoLocationService } from './services/geolocation.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { LayoutService } from './services/layout.service';
import { MotionService } from './services/motion.service';
import { AppConfig } from '../../myhomeappconfig';
import { GpsPageModule } from './gps/gps.module';
import { MotionPageModule } from './motion/motion.module';
import { ProductService, BUILD_INFO } from './services/product.service';
import { TodoService } from './services/todo.service';
import { UploadFileService } from './services/upload-file.service';
import { YoutubeService } from './services/youtube.service';
import { LoginPageModule } from './login/login.module';
import { LogoutPageModule } from './logout/logout.module';
import { ShoppingPageModule } from './shopping/shopping.module';
import { TodoPageModule } from './todo/todo.module';
import { SonglistPageModule } from './songlist/songlist.module';

/*
export class AppConfig {
  // Initialize Firebase
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
    AppRoutingModule,
    AngularFireModule.initializeApp(AppConfig.firebaseConfig),
    AngularFireModule.initializeApp(AppConfig.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    GpsPageModule,
    ShoppingPageModule,
    MotionPageModule,
    LoginPageModule,
    LogoutPageModule,
    TodoPageModule,
    SonglistPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    AuthGuard,
    LayoutService,
    ProductService,
    TodoService,
    UploadFileService,
    YoutubeService,
    GeoLocationService,
    MotionService,
    { provide: BUILD_INFO, useValue: AppConfig.appConfig.bts },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

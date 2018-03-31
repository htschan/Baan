import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { ProductService, BUILD_INFO } from '../services/product.service';
import { AuthService } from '../services/auth.service';

import { AppConfig } from '../../myhomeappconfig';
import { LogoutPage } from '../pages/logout/logout';
import { SplashPage } from '../pages/splash/splash';
import { LoginPage } from '../pages/login/login';
import { ShoppingItemPage } from '../pages/shoppingitem/shoppingitem';
import { ShoppingItemViewPage } from '../pages/shoppingitemview/shoppingitemview';
import { SelectProductPage } from '../pages/selectproduct/selectproduct';
import { YoutubeService } from '../services/youtube.service';
import { HomepopoverPage } from '../pages/homepopover/homepopover';
import { SonglistPage } from '../pages/songlist/songlist';
import { YoutubedownloadPage } from '../pages/youtubedownload/youtubedownload';
import { ViewvideoPage } from '../pages/viewvideo/viewvideo';
import { YoutubesanitizerPipe } from '../pipes/youtubesanitizer/youtubesanitizer';
import { CameraPage } from '../pages/camera/camera';
import { TestpagePageModule } from '../pages/testpage/testpage.module';
import { GpspagePageModule } from '../pages/gpspage/gpspage.module';
import { GeoLocationService } from '../services/geolocation.service';
import { MotionService } from '../services/motion.service';
import { MotionPageModule } from '../pages/motion/motion.module';

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
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    HomepopoverPage,
    SonglistPage,
    YoutubedownloadPage,
    YoutubesanitizerPipe,
    ViewvideoPage,
    CameraPage,
    LoginPage,
    LogoutPage,
    SplashPage,
    ShoppingItemPage,
    ShoppingItemViewPage,
    SelectProductPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(AppConfig.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    TestpagePageModule,
    GpspagePageModule,
    MotionPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    HomepopoverPage,
    SonglistPage,
    YoutubedownloadPage,
    ViewvideoPage,
    CameraPage,
    LoginPage,
    LogoutPage,
    SplashPage,
    ShoppingItemPage,
    ShoppingItemViewPage,
    SelectProductPage,
    TabsPage
  ],
  providers: [
    AngularFireDatabase,
    ProductService,
    YoutubeService,
    GeoLocationService,
    AuthService,
    MotionService,
    { provide: BUILD_INFO, useValue: AppConfig.appConfig.bts },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }

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

import { ProductService, BUILD_INFO } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import { YoutubeService } from '../services/youtube.service';
import { LayoutService } from '../services/layout.service';
import { GeoLocationService } from '../services/geolocation.service';
import { MotionService } from '../services/motion.service';
import { TodoService } from '../services/todo.service';

import { HomePage } from '../pages/home/home';

import { AppConfig } from '../../myhomeappconfig';
import { LogoutPage } from '../pages/logout/logout';
import { SplashPage } from '../pages/splash/splash';
import { LoginPage } from '../pages/login/login';
import { SelectProductPage } from '../pages/selectproduct/selectproduct';
import { SonglistPage } from '../pages/songlist/songlist';
import { ViewvideoPage } from '../pages/viewvideo/viewvideo';
import { YoutubesanitizerPipe } from '../pipes/youtubesanitizer/youtubesanitizer';
import { TestpagePageModule } from '../pages/testpage/testpage.module';
import { GpspagePageModule } from '../pages/gpspage/gpspage.module';
import { MotionPageModule } from '../pages/motion/motion.module';
import { ChatRoomPageModule } from '../pages/chat/chat-room/chat-room.module';
import { TodoPageModule } from '../pages/todo/todo/todo.module';
import { ShoppingPageModule } from '../pages/shop/shopping/shopping.module';
import { SonglistPageModule } from '../pages/songlist/songlist.module';
import { YoutubedownloadPageModule } from '../pages/youtubedownload/youtubedownload.module';
import { CameraPageModule } from '../pages/camera/camera.module';
import { ContactPageModule } from '../pages/contact/contact.module';
import { AboutPageModule } from '../pages/about/about.module';

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
    HomePage,
    YoutubesanitizerPipe,
    ViewvideoPage,
    LoginPage,
    LogoutPage,
    SplashPage,
    SelectProductPage,
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
    YoutubedownloadPageModule,
    CameraPageModule,
    GpspagePageModule,
    MotionPageModule,
    SonglistPageModule,
    ChatRoomPageModule,
    ShoppingPageModule,
    TodoPageModule,
    ContactPageModule,
    AboutPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SonglistPage,
    ViewvideoPage,
    LoginPage,
    LogoutPage,
    SplashPage,
    SelectProductPage,
  ],
  providers: [
    AngularFireDatabase,
    ProductService,
    YoutubeService,
    GeoLocationService,
    AuthService,
    MotionService,
    { provide: BUILD_INFO, useValue: AppConfig.appConfig.bts },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LayoutService,
    TodoService
  ]
})
export class AppModule { }

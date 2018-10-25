import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { IonicModule } from '@ionic/angular';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { LoginComponent } from './login/login.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlackComponent } from './slack/slack.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  declarations: [
    ProfileComponent,
    LoginComponent,
    SlackComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    AngularFireMessagingModule,
    ProfileComponent,
    LoginComponent,
    SlackComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthGuard,
        AuthService
      ]
    };
  }
}

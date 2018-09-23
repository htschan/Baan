import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [ProfileComponent, LoginComponent],
  exports: [ProfileComponent, LoginComponent]
})
export class SharedModule { }

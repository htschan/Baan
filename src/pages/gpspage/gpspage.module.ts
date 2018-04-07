import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GpsPage } from './gpspage';

@NgModule({
  declarations: [
    GpsPage,
  ],
  imports: [
    IonicPageModule.forChild(GpsPage),
  ],
})
export class GpspagePageModule {}

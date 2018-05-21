import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KmlPage } from './kml';
import { AgmCoreModule } from '@agm/core';
import { AppConfig } from '../../../myhomeappconfig';

@NgModule({
  declarations: [
    KmlPage,
  ],
  imports: [
    IonicPageModule.forChild(KmlPage),
    AgmCoreModule.forRoot({
      apiKey: AppConfig.googleMaps.apiKey
    }),
  ],
})
export class KmlPageModule {}

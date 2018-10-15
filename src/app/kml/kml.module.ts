import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { KmlPage } from './kml.page';
import { FileUploadComponent } from '../components/file-upload/file-upload.component';
import { FileSizePipe } from '../pipes/file-size/file-size';
import { AgmCoreModule, KmlLayerManager, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AppConfig } from '../../myhomeappconfig';

const routes: Routes = [
  {
    path: '',
    component: KmlPage
  }
];

@NgModule({
  entryComponents: [
    FileUploadComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: AppConfig.googleMaps.apiKey
    }),
    AgmJsMarkerClustererModule,
  ],
  declarations: [
    KmlPage,
    FileUploadComponent,
    FileSizePipe
  ],
  providers: [
    GoogleMapsAPIWrapper,
    KmlLayerManager,
  ]
})
export class KmlPageModule { }

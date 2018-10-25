import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { GpsPage } from './gps.page';

const routes: Routes = [
  {
    path: '',
    component: GpsPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GpsPage]
})
export class GpsPageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CameraPage } from './camera.page';

const routes: Routes = [
  {
    path: '',
    component: CameraPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CameraPage]
})
export class CameraPageModule { }

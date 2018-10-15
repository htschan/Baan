import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { YoutubedownloadPage } from './youtubedownload.page';

const routes: Routes = [
  {
    path: '',
    component: YoutubedownloadPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [YoutubedownloadPage]
})
export class YoutubedownloadPageModule { }

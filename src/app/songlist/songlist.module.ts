import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SonglistPage } from './songlist.page';
import { ViewvideoComponent } from './viewvideo/viewvideo.component';
import { YoutubesanitizerPipe } from '../pipes/youtubesanitizer/youtubesanitizer';

const routes: Routes = [
  {
    path: '',
    component: SonglistPage
  },
  {
    path: 'viewvideo',
    component: ViewvideoComponent
  }
];

@NgModule({
  entryComponents: [
    ViewvideoComponent
  ],
  declarations: [
    SonglistPage,
    ViewvideoComponent,
    YoutubesanitizerPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class SonglistPageModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
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
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SonglistPageModule { }

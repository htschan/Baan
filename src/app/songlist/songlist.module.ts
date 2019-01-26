import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SonglistPage } from './songlist.page';
import { ViewvideoComponent } from './viewvideo/viewvideo.component';
import { YoutubesanitizerPipe } from '../pipes/youtubesanitizer/youtubesanitizer';
import { ViewdetailPage } from './viewdetail/viewdetail.page';
import { LineBreakerPipe } from '../pipes/line-breaker/line-breaker';
import { KeephtmlPipe } from '../pipes/keep-html/keep-html';

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
    ViewvideoComponent,
    ViewdetailPage
  ],
  declarations: [
    SonglistPage,
    ViewvideoComponent,
    ViewdetailPage,
    KeephtmlPipe,
    LineBreakerPipe,
    YoutubesanitizerPipe
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SonglistPageModule { }

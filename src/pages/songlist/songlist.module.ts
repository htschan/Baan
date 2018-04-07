import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SonglistPage } from './songlist';

@NgModule({
  declarations: [
    SonglistPage,
  ],
  imports: [
    IonicPageModule.forChild(SonglistPage),
  ],
})
export class SonglistPageModule {}

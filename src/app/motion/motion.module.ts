import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MotionPage } from './motion.page';

const routes: Routes = [
  {
    path: '',
    component: MotionPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MotionPage]
})
export class MotionPageModule {}

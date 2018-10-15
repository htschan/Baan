import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ListPage } from './list.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListPage
      }
    ])
  ],
  declarations: [ListPage]
})
export class ListPageModule { }

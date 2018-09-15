import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule, Item } from '@ionic/angular';

import { TodoPage, PopoverPage } from './todo.page';
import { ItemviewComponent } from './itemview/itemview.component';

const routes: Routes = [
  {
    path: '',
    component: TodoPage
  }
];

@NgModule({
  entryComponents: [
    ItemviewComponent,
    PopoverPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ReactiveFormsModule
  ],
  declarations: [TodoPage, ItemviewComponent, PopoverPage]
})
export class TodoPageModule {}

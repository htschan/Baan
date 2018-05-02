import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodoPage, PopoverPage } from './todo';
import { TodoItemviewPage } from '../itemview/todo-itemview';

@NgModule({
  declarations: [
    TodoPage,
    TodoItemviewPage,
    PopoverPage
  ],
  entryComponents: [
    TodoPage,
    TodoItemviewPage,
    PopoverPage
  ],
  imports: [
    IonicPageModule.forChild(TodoPage),
  ],
})
export class TodoPageModule {}

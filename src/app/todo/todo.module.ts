import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TodoPage } from './todo.page';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TodoPage
  },
  {
    path: ':id',
    component: TodoDetailComponent
  }
];

@NgModule({
  entryComponents: [TodoFormComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TodoPage, TodoFormComponent, TodoDetailComponent]
})
export class TodoPageModule { }

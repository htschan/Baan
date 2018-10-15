import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ShoppingPage } from './shopping.page';
import { ShoppingitemComponent } from './shoppingitem/shoppingitem.component';
import { ShoppingitemviewComponent } from './shoppingitemview/shoppingitemview.component';
import { SelectproductComponent } from './selectproduct/selectproduct.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingPage
  }
];

@NgModule({
  entryComponents: [
    ShoppingitemComponent,
    ShoppingitemviewComponent,
    SelectproductComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShoppingPage, ShoppingitemComponent, ShoppingitemviewComponent, SelectproductComponent]
})
export class ShoppingPageModule { }

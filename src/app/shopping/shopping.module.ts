import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ShoppingPage } from './shopping.page';
import { ShoppingitemComponent } from './shoppingitem/shoppingitem.component';
import { ShoppingitemviewComponent } from './shoppingitemview/shoppingitemview.component';
import { SelectproductComponent } from './selectproduct/selectproduct.component';
import { ViewitemComponent } from './viewitem/viewitem.component';
import { ItemDetailComponent } from './itemdetail/itemdetail.component';
import { EdititemComponent } from './edititem/edititem.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingPage
  },
  {
    path: ':id',
    component: ViewitemComponent
  }
];

@NgModule({
  entryComponents: [
    ShoppingitemComponent,
    ShoppingitemviewComponent,
    SelectproductComponent,
    ItemDetailComponent,
    EdititemComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ShoppingPage,
    ShoppingitemComponent,
    ShoppingitemviewComponent,
    SelectproductComponent,
    ViewitemComponent,
    ItemDetailComponent,
    EdititemComponent
  ]
})
export class ShoppingPageModule { }

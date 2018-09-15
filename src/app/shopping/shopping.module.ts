import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

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
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShoppingPage, ShoppingitemComponent, ShoppingitemviewComponent, SelectproductComponent]
})
export class ShoppingPageModule { }

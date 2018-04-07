import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingPage } from './shopping';
import { ShoppingItemPage } from '../shoppingitem/shoppingitem';
import { ShoppingItemViewPage } from '../shoppingitemview/shoppingitemview';

@NgModule({
  declarations: [
    ShoppingPage,
    ShoppingItemPage,
    ShoppingItemViewPage
  ],
  entryComponents: [
    ShoppingPage,
    ShoppingItemPage,
    ShoppingItemViewPage
  ],
  imports: [
    IonicPageModule.forChild(ShoppingPage),
  ],
})
export class ShoppingPageModule { }

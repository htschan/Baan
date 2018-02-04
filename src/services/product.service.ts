import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ProductVm } from '../viewmodels/productvm';
import { ShoppingItemVm } from '../viewmodels/shoppingitemvm';

const FbBase = "/MyHome";

@Injectable()
export class ProductService {
    categories: Observable<any[]>;
    products: Observable<ProductVm[]>;
    favorites: Observable<any[]>;
    shoppingitems: Observable<ShoppingItemVm[]>;

    constructor(af: AngularFireDatabase) {
        this.categories = af.list(`${FbBase}/ProductCategories`).valueChanges();
        this.products = af.list<ProductVm>(`${FbBase}/Products/Coop3/NoCategory`).valueChanges();
        this.shoppingitems = af.list<ShoppingItemVm>(`${FbBase}/Shoppinglist`).valueChanges();
    }

    getCategories(): Observable<any[]> {
        return this.categories;
    }
    setCategory(cat) {
        // this.products = this.af.list('/MyHome/Products/Coop3/' + encodeURI(cat.Name));
    }
    getProducts(): Observable<ProductVm[]> {
        return this.products;
    }
    deleteProduct(item) {
        // this.products.remove(item);
    }
    editProduct(item) {

    }

    // ======== Shoppinglist ===========
    getShoppinglist(): Observable<ShoppingItemVm[]> {
        return this.shoppingitems;
    }
    // buyShoppinglistItem(item: any) {
    //     this.shoppingitems.remove(item);
    // }
    // deleteShoppinglistItem(item: any) {
    //     this.shoppingitems.remove(item);
    // }
    // addShoppinglistItem(item: ShoppingItem) {
    //     this.shoppingitems.push([item]);
    // }
    // updateShoppinglistItem(key: string, item: any) {
    //     this.shoppingitems.update(key, item);
    // }

}


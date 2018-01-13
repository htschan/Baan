import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {
    categories: Observable<any[]>;
    products: Observable<any[]>;
    favorites: Observable<any[]>;
    shoppingitems: Observable<any[]>;

    constructor(private af: AngularFireDatabase) {
        this.categories = af.list('/MyHome/ProductCategories').valueChanges();
        this.products = af.list('/MyHome/Products/Coop3/NoCategory').valueChanges();
        this.shoppingitems = af.list('/MyHome/Shoppinglist').valueChanges();
    }

    getCategories(): Observable<any[]> {
        return this.categories;
    }
    setCategory(cat) {
        // this.products = this.af.list('/MyHome/Products/Coop3/' + encodeURI(cat.Name));
    }
    getProducts(): Observable<any[]> {
        return this.products;
    }
    deleteProduct(item) {
        // this.products.remove(item);
    }
    editProduct(item) {

    }

    // ======== Shoppinglist ===========
    getShoppinglist(): Observable<ShoppingItem[]> {
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

export class ShoppingItem {
    Name: string;
    Price: string;
    Quantity: string;
    Url: string;
}
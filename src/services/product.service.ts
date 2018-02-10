import { Injectable, InjectionToken } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ProductVm } from '../viewmodels/productvm';
import { ShoppingItemVm } from '../viewmodels/shoppingitemvm';

export const BUILD_INFO = new InjectionToken<string>('BUILD_INFO');
const FbBase = "/MyHome";

@Injectable()
export class ProductService {
    categories: Observable<any[]>;
    productsRef: AngularFireList<any>;
    products: Observable<any[]>;
    favorites: Observable<any[]>;
    shoppingitemsRef: AngularFireList<any>;
    shoppingitems: Observable<any[]>;

    constructor(af: AngularFireDatabase) {
        this.categories = af.list(`${FbBase}/ProductCategories`).valueChanges();

        this.productsRef = af.list<ProductVm>(`${FbBase}/Products/Coop3/NoCategory`);
        this.products = this.productsRef.snapshotChanges().map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });

        this.shoppingitemsRef = af.list(`${FbBase}/Shoppinglist`);
        // Use snapshotChanges().map() to store the key
        this.shoppingitems = this.shoppingitemsRef.snapshotChanges().map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
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
    deleteShoppinglistItem(key: string) {
        this.shoppingitemsRef.remove(key);
    }
    addShoppinglistItem(item: ShoppingItemVm) {
        this.shoppingitemsRef.push(item);
    }
    // updateShoppinglistItem(key: string, item: any) {
    //     this.shoppingitems.update(key, item);
    // }

}


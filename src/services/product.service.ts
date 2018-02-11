import { Injectable, InjectionToken } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ProductVm } from '../viewmodels/productvm';
import { ShoppingItemVm } from '../viewmodels/shoppingitemvm';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import { firebase } from 'firebase/firestore';

export const BUILD_INFO = new InjectionToken<string>('BUILD_INFO');
const FbBase = "/MyHome";

@Injectable()
export class ProductService {
    categoriesRef: AngularFireList<any>;
    categories: Observable<any[]>;
    productsRef: AngularFireList<any>;
    products: Observable<any[]>;
    favorites: Observable<any[]>;
    shoppingitemsRef: AngularFireList<any>;
    shoppingitems: Observable<any[]>;
    catFilter$: BehaviorSubject<string | null>;
    items$: Observable<any[]>;

    constructor(af: AngularFireDatabase, afs: AngularFirestore) {
        this.catFilter$ = new BehaviorSubject(null);
        this.categoriesRef = af.list(`${FbBase}/ProductCategories`);
        this.categories = this.categoriesRef.snapshotChanges().map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
        this.productsRef = af.list<ProductVm>(`${FbBase}/Products/Coop2`);
        this.products = this.productsRef.snapshotChanges().map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });

        this.shoppingitemsRef = af.list(`${FbBase}/Shoppinglist`);
        // Use snapshotChanges().map() to store the key
        this.shoppingitems = this.shoppingitemsRef.snapshotChanges().map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });

        this.items$ = Observable.combineLatest(
            this.catFilter$
        ).switchMap(([category]) =>
            afs.collection(`${FbBase}/Products/Coop2`, ref => {
                let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
                if (category) { query = query.where('Cat', '==', category) };
                return query;
            }).valueChanges()
        );
    }

    filterByCategory(category: string | null) {
        this.catFilter$.next(category);
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


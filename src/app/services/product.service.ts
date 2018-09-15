import { Injectable, InjectionToken } from '@angular/core';
import { AngularFireList, AngularFireAction, AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ProductVm } from '../../viewmodels/productvm';
import { ShoppingItemVm } from '../../viewmodels/shoppingitem';

export const BUILD_INFO = new InjectionToken<string>('BUILD_INFO');
const FbBase = '/MyHome';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    categoriesRef: AngularFireList<any>;
    categories: Observable<any[]>;
    productsRef: AngularFireList<any>;
    products: Observable<any[]>;
    favorites: Observable<any[]>;
    shoppingitemsRef: AngularFireList<any>;
    shoppingitems: Observable<any[]>;
    catFilter$: BehaviorSubject<string | null>;
    items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;

    constructor(private af: AngularFireDatabase, afs: AngularFirestore) {
        this.catFilter$ = new BehaviorSubject(null);
        this.categoriesRef = af.list(`${FbBase}/ProductCategories`);
        this.categories = this.categoriesRef.snapshotChanges().pipe(map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        }));
        this.productsRef = af.list<ProductVm>(`${FbBase}/Products/Coop2`);
        this.products = this.productsRef.snapshotChanges().pipe(map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        }));

        this.shoppingitemsRef = af.list(`${FbBase}/Shoppinglist`);
        // Use snapshotChanges().map() to store the key
        this.shoppingitems = this.shoppingitemsRef.snapshotChanges().pipe(map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        }));

        this.items$ = this.catFilter$.pipe(switchMap(cat =>
            af.list(`${FbBase}/Products/Coop2`, ref =>
                cat ? ref.orderByChild('Cat').equalTo(cat) : ref
            ).snapshotChanges()
        ));
    }

    filterByCategory($event: any | null) {
        this.catFilter$.next($event);
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
    importantProduct(key: string, val: boolean) {
        this.af.object(`${FbBase}/Shoppinglist/${key}`).update({ Important: val });
    }
    favoriteProduct(key: string, val: boolean) {
        this.af.object(`${FbBase}/Shoppinglist/${key}`).update({ Favorite: val });
    }
    deleteShoppinglistItem(key: string) {
        this.shoppingitemsRef.remove(key);
    }
    addShoppinglistItem(item: ShoppingItemVm) {
        this.shoppingitemsRef.push(item);
    }
    updateShoppinglistItem(key: string, item: any) {
        this.af.object(`${FbBase}/Shoppinglist/${key}`).update({
            Name: item.Name,
            Description: item.Description,
            Important: item.Important,
            Favorite: item.Favorite
        });
    }
}

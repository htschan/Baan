import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private afs: AngularFirestore) { }

  collection$(path, query?) {
    return this.afs
      .collection(path, query)
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data: Object = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  doc$(path): Observable<any> {
    return this.afs
      .doc(path)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return { id: doc.payload.id, ...doc.payload.data() };
        })
      );
  }

  /**
   * @param {string} path 'collection' or 'collection/DocID'
   * @param {object} data new data
   *
   * Creates or updates on a collection or document.
   */
  updateAt(path: string, data: Object): Promise<any> {
    const segments = path.split('/').filter(v => v);
    if (segments.length % 2) {
      // odd is always a collection
      return this.afs.collection(path).add(data);
    } else {
      // even is always a document
      return this.afs.doc(path).set(data, { merge: true });
    }
  }

  /**
   * @param {string} path to document
   *
   * Delete document from Firestore
   */
  delete(path: string) {
    return this.afs.doc(path).delete();
  }
}

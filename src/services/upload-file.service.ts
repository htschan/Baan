import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize, tap, flatMap } from 'rxjs/operators';

import { FileUpload } from '../model/fileupload';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operator/map';
import { switchMap } from 'rxjs/operator/switchMap';

@Injectable()
export class UploadFileService {

  constructor(private afStorage: AngularFireStorage, private db: AngularFirestore) {
    // this.downloadURL.subscribe(url => {
    //   console.log("url = " + url);
    // })
  }


  private basePath = '/MyHome/kml';
  downloadURL: Observable<string>;
  uploadPercent: Observable<number>;
  snapshot: Observable<any>;

  pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }) {
    const file = fileUpload.file;
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const fileRef = this.afStorage.ref(filePath);
    const uploadTask = this.afStorage.upload(filePath, file);

    this.uploadPercent = uploadTask.percentageChanges();

    // get notified when the download URL is available
    uploadTask.snapshotChanges().pipe(
      tap(beer => {
        console.log(`Before: ${beer}`)
      }),
      finalize(() => this.downloadURL = fileRef.getDownloadURL()),
    ).subscribe();

    // this.snapshot = uploadTask.snapshotChanges().pipe(
    //   tap(snap => {
    //     if (snap.bytesTransferred === snap.totalBytes) {
    //       // Update firestore on completion
    //       this.db.collection('photos').add( { path: this.basePath, size: snap.totalBytes })
    //     }
    //   })
    // )
  }

  // private saveFileData(fileUpload: FileUpload) {
  //   // this.db.list(`${this.basePath}/`).push(fileUpload);
  // }
}

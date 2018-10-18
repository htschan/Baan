import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileUpload } from '../../model/fileupload';
import { AngularFirestore } from '@angular/fire/firestore';
import { IAppConfig } from '../shared/IAppConfig';
import { APP_CONFIG_DI } from '../../myhomeappconfig';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private basePath = `${this.appConfig.FbBase}/kml`;
  downloadURL: Observable<string>;
  uploadPercent: Observable<number>;
  snapshot: Observable<any>;

  constructor(@Inject(APP_CONFIG_DI) private appConfig: IAppConfig, private afStorage: AngularFireStorage, private db: AngularFirestore) {
    // this.downloadURL.subscribe(url => {
    //   console.log("url = " + url);
    // })
  }

  pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }) {
    const file = fileUpload.file;
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const fileRef = this.afStorage.ref(filePath);
    const uploadTask = this.afStorage.upload(filePath, file);

    this.uploadPercent = uploadTask.percentageChanges();

    // get notified when the download URL is available
    uploadTask.snapshotChanges().pipe(
      tap(beer => {
        console.log(`Before: ${beer}`);
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

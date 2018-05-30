import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

import { FileUpload } from '../model/fileupload';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadFileService {

  constructor(private afStorage: AngularFireStorage) { }


  private basePath = '/MyHome/kml';
  downloadURL: Observable<string>;
  uploadPercent: Observable<number>;

  pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }) {
    const file = fileUpload.file;
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const fileRef = this.afStorage.ref(filePath);
    const uploadTask = this.afStorage.upload(filePath, file);

    this.uploadPercent = uploadTask.percentageChanges();

    // get notified when the download URL is available
    uploadTask.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL())
    ).subscribe();

  }

  // private saveFileData(fileUpload: FileUpload) {
  //   // this.db.list(`${this.basePath}/`).push(fileUpload);
  // }
}

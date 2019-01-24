import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { YtQueuedTracksVm } from '../../viewmodels/ytqueuedtrack';
import { YtMetaDataVm } from '../../viewmodels/ytmetadata';
import { tap, catchError } from 'rxjs/operators';
import { APP_CONFIG_DI } from '../../myhomeappconfig';
import { IAppConfig } from '../shared/IAppConfig';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private queuedTracksSubject: BehaviorSubject<YtQueuedTracksVm> = new BehaviorSubject(new YtQueuedTracksVm());
  //  audiotracks: Observable<YtMetaDataVm[]>;
  audiotracks: any;
  queuedtracks: Observable<YtQueuedTracksVm> = this.queuedTracksSubject.asObservable();

  constructor(
    @Inject(APP_CONFIG_DI) private appConfig: IAppConfig,
    private http: HttpClient) {

    this.audiotracks = this.http.get<YtMetaDataVm>(this.appConfig.baanBackend.downloadMetaDataUrl, httpOptions)
      .pipe(
        catchError(this.handleError('constructor', []))
      );
  }

  deleteSong(item) {
    return this.http.post<string>(this.appConfig.baanBackend.deleteSongUrl, { 'metadataFile': item.metadataFile }, httpOptions)
      .pipe(
        catchError(this.handleError('deleteSong', []))
      );
  }

  apiinfo(): Observable<any> {
    return this.http.get<any>(this.appConfig.baanBackend.apiInfoUrl);
  }

  downloadAudio(url: string): Observable<any> {
    return this.http.post<string>(this.appConfig.baanBackend.downloadUrl, { 'url': url }, httpOptions)
      .pipe(
        catchError(this.handleError('downloadAudio', []))
      );
  }

  updateQueuedTracks(): Observable<any> {
    return this.getQueuedTracks().pipe(
      tap(data => this.queuedTracksSubject.next(data)),
      catchError(this.handleError('updateQueuedTracks', [])));
  }

  getQueuedTracks(): Observable<YtQueuedTracksVm> {
    return this.http.get<YtQueuedTracksVm>(this.appConfig.baanBackend.downloadQueuedTracksUrl);
    // .map((response: Response) => {
    //     let data = response.json() && response.json().something;
    //     if (data) {
    //         return data;
    //     }
    // })
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    //  this.messageService.add(`youtube.service: ${message}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { YtQueuedTracksVm } from '../../viewmodels/ytqueuedtrack';
import { YtMetaDataVm } from '../../viewmodels/ytmetadata';
import { tap, catchError } from 'rxjs/operators';

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
  downloadUrl = 'https://baanbackend.kitsdg.ch/api/youtube/download';
  apiInfoUrl = 'https://baanbackend.kitsdg.ch/api/youtube/apiinfo';
  downloadMetaDataUrl = 'https://baanbackend.kitsdg.ch/api/youtube/downloadmetadata';
  downloadQueuedTracksUrl = 'https://baanbackend.kitsdg.ch/api/youtube/downloadqueue';

  private queuedTracksSubject: BehaviorSubject<YtQueuedTracksVm> = new BehaviorSubject(new YtQueuedTracksVm());
  //  audiotracks: Observable<YtMetaDataVm[]>;
  audiotracks: any;
  queuedtracks: Observable<YtQueuedTracksVm> = this.queuedTracksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.audiotracks = this.http.get<YtMetaDataVm>(this.downloadMetaDataUrl, httpOptions)
      .pipe(
        catchError(this.handleError('constructor', []))
      );
  }

  apiinfo(): Observable<any> {
    return this.http.get<any>(this.apiInfoUrl);
  }

  downloadAudio(url: string): Observable<any> {
    return this.http.post<string>(this.downloadUrl, { 'url': url }, httpOptions)
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
    return this.http.get<YtQueuedTracksVm>(this.downloadQueuedTracksUrl);
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

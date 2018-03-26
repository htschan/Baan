import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { YtMetaDataVm } from '../viewmodels/ytmetadata';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { YtQueuedTracksVm } from '../viewmodels/ytqueuedtracks';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

@Injectable()
export class YoutubeService {

    downloadUrl = "https://baanbackend.kitsdg.ch/api/youtube/download";
    apiInfoUrl = "https://baanbackend.kitsdg.ch/api/youtube/apiinfo";
    downloadMetaDataUrl = "https://baanbackend.kitsdg.ch/api/youtube/downloadmetadata";
    downloadQueuedTracksUrl = "https://baanbackend.kitsdg.ch/api/youtube/downloadqueue";

    private queuedTracksSubject: BehaviorSubject<YtQueuedTracksVm> = new BehaviorSubject(new YtQueuedTracksVm());
    audiotracks: Observable<YtMetaDataVm[]>;
    queuedtracks: Observable<YtQueuedTracksVm> = this.queuedTracksSubject.asObservable();

    constructor(private http: HttpClient) {
        this.audiotracks = this.http.get<YtMetaDataVm>(this.downloadMetaDataUrl, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    apiinfo(): Observable<any> {
        return this.http.get<any>(this.apiInfoUrl);
    }

    downloadAudio(url: string): Observable<any> {
        return this.http.post<string>(this.downloadUrl, { "url": url }, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateQueuedTracks(): Observable<any> {
        return this.getQueuedTracks().pipe(
            tap(data => this.queuedTracksSubject.next(data)),
            catchError(this.handleError));
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

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(
            'Something bad happened; please try again later.');
    };
}


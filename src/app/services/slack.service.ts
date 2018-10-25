import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG_DI } from '../../myhomeappconfig';
import { IAppConfig } from '../shared/IAppConfig';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError, of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlackService {

  constructor(@Inject(APP_CONFIG_DI) private appConfig: IAppConfig, private http: HttpClient) {
    console.log(this.appConfig.SlackWebHookUrl);
  }

  notifySlack(slackObject: object) {
    return this.http.post(this.appConfig.SlackWebHookUrl,
      `payload=${JSON.stringify(slackObject)}`, {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        ),
        responseType: 'text'
      })
      .pipe(
        tap(
          success => success,
          error => console.log(`Slack send returned error ${error}`)
        )
      );
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
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}

import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { shareReplay, tap, retry } from 'rxjs/operators';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private webReq: WebRequestService, private router: Router, private http: HttpClient ) { }

  login(email: string, password: string) {
    return this.webReq.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        console.log(res.headers);
        console.log('Logged In');
        // this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        this.setSession(res.body._id, res.body['x-access-token'], res.body['x-refresh-token']);
      })
    );
  }

  signup(email: string, password: string) {
    return this.webReq.signup(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        console.log(res.headers);
        console.log('Signed up and Logged In Successfully');
        // this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        this.setSession(res.body._id, res.body['x-access-token'], res.body['x-refresh-token']);
      })
    );
  }

  logout() {
    this.removeSession();
    this.router.navigate(['/login']);
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken);
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId );
    localStorage.setItem('x-access-token', accessToken );
    localStorage.setItem('x-refresh-token', refreshToken );
  }

  private removeSession() {
    localStorage.removeItem('user-id' );
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

  getNewAccessToken() {
    return this.http.get(`${this.webReq.URL_ROOT}/users/me/access-token` , {
      headers : {
        'x-access-token': this.getRefreshToken(),
        '_id': this.getUserId()
      },
       observe : 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        this.setAccessToken(res.body['x-access-token']);
      })
    );
  }
}

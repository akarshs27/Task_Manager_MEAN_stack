import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly URL_ROOT;

  constructor( private http: HttpClient ) {
    this.URL_ROOT = 'http://localhost:3000';
  }

  get(uri: string) {
    return this.http.get(`${this.URL_ROOT}/${uri}`);
  }

  post(uri: string, payload: object) {
    return this.http.post(`${this.URL_ROOT}/${uri}`, payload);
  }

  patch(uri: string, payload: object) {
    return this.http.patch(`${this.URL_ROOT}/${uri}`, payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.URL_ROOT}/${uri}`);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.URL_ROOT}/users/login`, {
      email,
      password
    }, {
      observe: 'response'
      });
  }

  signup(email: string, password: string) {
    return this.http.post(`${this.URL_ROOT}/users`, {
      email,
      password
    }, {
      observe: 'response'
      });
  }
}

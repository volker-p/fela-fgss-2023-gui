import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {

  constructor(private http: HttpClient) {}

  getHello(name: string): Observable<{ message: string }> {
    // /api is routed to Node via the proxy config
    return this.http.get<{ message: string }>(`/api/hello?name=${encodeURIComponent(name)}`);
  }
}

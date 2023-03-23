import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from "rxjs";
import { MockResponse } from "../../model/model";
import * as mockResponse from  "../../../assets/data.json";

@Injectable({
  providedIn: 'root'
})

export class MockBackendInterceptorService implements HttpInterceptor {
  data: MockResponse = mockResponse;
  private readonly mockData = of(
    new HttpResponse({
      status: 200,
      statusText: 'OK',
      body: this.data
    })
  );

  private readonly mockResponse = of(
    new HttpResponse({
      status: 200,
      statusText: 'OK'
    })
  );

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (request.method === 'GET' && request.url.endsWith('/data')) {
      return this.mockData;
    } else if (request.method === 'POST' && request.url.endsWith('/data')) {
      return this.mockResponse;
    } else {
      return next.handle(request);
    }
  }
}

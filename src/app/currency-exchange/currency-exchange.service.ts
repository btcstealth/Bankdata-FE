import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CurrencyExchangeService {
    constructor(private http: HttpClient) { }

    getExchangeRateData(url: string): Observable<any> {
        return this.http.get(url);
    }

}

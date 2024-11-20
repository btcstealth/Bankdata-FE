import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum CurrencyUnitEnum {
  USD,
  DKK,
  EUR
}

@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrl: './currency-exchange.component.scss'
})
export class CurrencyExchangeComponent {

  currencyOptions: string[] = [
    'DKK',
    'USD',
    'EUR' 
  ];

  fromCurrency: string = 'DKK';
  toCurrency: string = 'USD';
  currencyExchangeResponse: number = 0.0;

  //currencyExchangeService
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.addEventListener();
  }

  private addEventListener(): void {
    const localhostUrl: string = 'http://localhost:8080';
    const endpointUrl: string = '/exchange/rate/';

    const button = document.getElementById('currencyExchangeBtn') as HTMLButtonElement;
      button.addEventListener('click', () => {
      this.getExchangeRateData(localhostUrl + endpointUrl + this.fromCurrency + '/' + this.toCurrency)
        	.subscribe({
            next: (response: any) => {
              console.log("running next");
              console.log(response);
              this.currencyExchangeResponse = response
            },
            error: (error) => console.error(`Error occurred: ${error.message}`),
            complete: () => console.log('Observable completed')
          });
    });
  }

  private getExchangeRateData(url: string): Observable<any> {
    //const params = new HttpParams();
    //params.set('fromCurrency', this.fromCurrency);
    //params.set('toCurrency', this.toCurrency);
    //{params}
    return this.http.get(url);
  }

}

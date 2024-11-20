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

  displayRequestError: boolean = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.addEventListener();
  }

  private addEventListener(): void {
    const button = document.getElementById('currencyExchangeBtn') as HTMLButtonElement;
      button.addEventListener('click', () => {
      this.getExchangeRateData()
        	.subscribe({
            next: (response: number) => {
              this.displayRequestError = false;
              this.currencyExchangeResponse = response
            },
            error: (error) => {
              this.displayRequestError = true;
              console.error(`Error occurred: ${error.message}`)
            },
            complete: () => console.log('Observable completed')
          });
    });
  }

  //TODO: this should ideally be placed in currency-exchange.service.ts.
  //But I'm missing something obvious in order to get dependency injection for CurrencyExchangeService working in the constructor above.
  private getExchangeRateData(): Observable<number> {
    const localhostUrl: string = 'http://localhost:8080';
    const endpointUrl: string = '/exchange/rate/';

    //const params = new HttpParams();
    //params.set('fromCurrency', this.fromCurrency);
    //params.set('toCurrency', this.toCurrency);
    return this.http.get<number>(localhostUrl + endpointUrl + this.fromCurrency + '/' + this.toCurrency);
  }

}

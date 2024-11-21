import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CurrencyExchangeData {
  currencyType: string;
  amount: string;

  /*
  constructor(data: { currencyType: string; amount: string; }) {
    this.currencyType = data.currencyType;
    this.amount = data.amount;
  }

  public getCurrencyType(): string {
    return `${this.currencyType}px`;
  }

  public getAmount(): string {
    return `${this.amount}px`;
  }

  public toString(): string {
    return this.getCurrencyType() + ' : ' + this.getAmount();
  }
    */
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
  fundsToExchange: number = 0.0;
  currencyExchangeRate: number = 0.0;
  //create json object
  currencyExchangeAmount: CurrencyExchangeData[] = [];

  displayRequestError: boolean = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.addEventListeners();
  }

  private addEventListeners(): void {
    const currencyExchangeBtn = document.getElementById('currencyExchangeBtn') as HTMLButtonElement;
    currencyExchangeBtn.addEventListener('click', () => {
    this.getExchangeRateData().subscribe({
        next: (exchangeRate: number) => {
          this.displayRequestError = false;
          this.currencyExchangeRate = exchangeRate
        },
        error: (error) => {
          this.displayRequestError = true;
          console.error(`Error : ${error.message}`)
        },
        complete: () => console.log('Completed') });
    });



    const currencyExchangeAmountBtn = document.getElementById('currencyExchangeAmountBtn') as HTMLButtonElement;
    currencyExchangeAmountBtn.addEventListener('click', () => {
      this.getExchangeData().subscribe({
          next: (response: string) => {
            this.displayRequestError = false;
            //const test = JSON.parse(response);
          },
          error: (error) => {
            this.displayRequestError = true;
            console.error(`Error : ${error.message}`)
          },
          complete: () => console.log('Completed') });
      });

  }

  //TODO: this should ideally be placed in currency-exchange.service.ts.
  //But I'm missing something obvious in order to get dependency injection for CurrencyExchangeService working in the constructor above.
  private getExchangeRateData(): Observable<any> {
    const localhostUrl: string = 'http://localhost:8080';
    const endpointUrl: string = '/exchange/rate/';

    //const params = new HttpParams();
    //params.set('fromCurrency', this.fromCurrency);
    //params.set('toCurrency', this.toCurrency);
    return this.http.get<number>(localhostUrl + endpointUrl + this.fromCurrency + '/' + this.toCurrency);
  }

  private getExchangeData(): Observable<string> {
    const localhostUrl: string = 'http://localhost:8080';
    const endpointUrl: string = '/exchange/';
    return this.http.get<string>(localhostUrl + endpointUrl + this.fromCurrency + '/' + this.toCurrency + '/' + this.fundsToExchange);
  }

}

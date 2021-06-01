import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from './Models/employee';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private url = '/assets/data/employees.json';
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.url).pipe(catchError(this.errorHandler));
  }

  errorHandler(errorValue: HttpErrorResponse) {
    console.log('Caught Error', errorValue);
    return Observable.throw(errorValue.headers);
  }
}

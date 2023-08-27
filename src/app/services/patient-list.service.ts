import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { ADD_PATIENT, GET_PATIENT_LIST } from '../API_URL/api_url';

@Injectable({
  providedIn: 'root'
})
export class PatientListService {



   //constructor
   constructor(private _http: HttpClient) {}

    //get users-list
  getallpatientList(payload: any): Observable<any> {
    return this._http.post(GET_PATIENT_LIST, payload).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        this.commonErrorHandler(error.status, error.error.message);
        throw error;
      })
    );
  }

  AddPatient(payload: any) {
    return this._http.post(ADD_PATIENT, payload).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        this.commonErrorHandler(error.status, error.error.message);
        throw error;
      })
    );
  }

    //common error handaler
    public commonErrorHandler(errorStatus:any, errorMessage:any) {
      if (errorStatus !== null || errorStatus !== undefined) {
          console.log(errorMessage);
      }
    }
}

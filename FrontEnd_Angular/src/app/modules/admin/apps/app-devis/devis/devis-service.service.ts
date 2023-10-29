import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevisServiceService {
    localUrl: string ='http://localhost:8080/api/v1/devis/'
    //private _httpClient: any;
    constructor(private http: HttpClient) { }

    ajouterDevis(devis : any):Observable<any>{
     return this.http.post(`${this.localUrl}saveDevis`,devis);
    }
    updateDevis(devis : any):Observable<any>{
        return this.http.put(`${this.localUrl}updateDevis`,devis);
       }
    listDevis():Observable<any[]>{
      return this.http.get<any[]>(`${this.localUrl}getAll`)

    }
    deleteDevis(id:number):Observable<any>{
      return this.http.delete(`${this.localUrl}remove/${id}`)

    }
}

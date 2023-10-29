import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fournisseur } from 'app/modules/Models/Fournisseur';
import { BehaviorSubject, Observable, tap } from 'rxjs';


@Injectable({providedIn: 'root'})
export class ServiceFournisseur {


  private _data: BehaviorSubject<any> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    localUrl: string ='http://localhost:8080/api/v1/fournisseur/'
    //private _httpClient: any;
    constructor(private http: HttpClient) { }



    ajouterFournisseur(fr : Fournisseur):Observable<Fournisseur>{
     return this.http.post<Fournisseur>(`${this.localUrl}save`,fr);
     }
    updateFournisseur(fr : Fournisseur):Observable<Fournisseur>{
        return this.http.put<Fournisseur>(`${this.localUrl}updatee`,fr);
       }
    listFournisseur():Observable<Fournisseur[]>{
      return this.http.get<Fournisseur[]>(`${this.localUrl}findByAll`)

    }
    deletFournisseur(id:number):Observable<Fournisseur>{
      return this.http.delete<Fournisseur>(`${this.localUrl}removeFourn/${id}`)

    }

    getByIdFournisseur(id:number):Observable<Fournisseur>{
   return this.http.get<Fournisseur>(`${this.localUrl}getById/${id}`)
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for data
     */
    get data$(): Observable<any>
    {
        return this._data.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get data
     */
    getData(): Observable<any>
    {
        return this.http.get(`${this.localUrl}`).pipe(
            tap((response: any) =>
            {
                this._data.next(response);
            }),
        );
    }
}

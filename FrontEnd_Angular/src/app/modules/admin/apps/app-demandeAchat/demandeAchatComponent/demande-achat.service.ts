import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { DemandeAchat } from './demande-achat';

@Injectable({providedIn: 'root'})
export class DemandeAchatService {


  private _data: BehaviorSubject<any> = new BehaviorSubject(null);
   data :string ='';
   quantity :number ;
   motif_rejet :string;
   object ={};

    /**
     * Constructor
     */
    localUrl: string ='http://localhost:8080/api/v1/demandeachat/'
    //private _httpClient: any;
    constructor(private http: HttpClient) { }
    setMotif_Rejet(motif_rejet){
   this.motif_rejet = motif_rejet;
    }
    getMotif_Rejet(){
   return this.motif_rejet;
    }
    setQuantity(quantity){
   this.quantity = quantity;
    }
    getQuantity(){
        return this.quantity;
    }
    setObject(object){

   this.object = object
    }

    getObject(){

        return this.object;
    }
    ajouterDemandeAchat(dmd : DemandeAchat):Observable<DemandeAchat>{
     return this.http.post<DemandeAchat>(`${this.localUrl}saveDemande`,dmd);
    }
    updateDemandeAchat(dmd : DemandeAchat):Observable<DemandeAchat>{
        return this.http.put<DemandeAchat>(`${this.localUrl}updateDemande`,dmd);
       }
    listDemandeAchat():Observable<DemandeAchat[]>{
      return this.http.get<DemandeAchat[]>(`${this.localUrl}getAll`)

    }
    deletDemandeAchat(id:number):Observable<DemandeAchat>{
      return this.http.delete<DemandeAchat>(`${this.localUrl}remoove/${id}`)

    }
    validerDemande(demand : DemandeAchat):Observable<DemandeAchat>{
        return this.http.put<DemandeAchat>(`${this.localUrl}accept-Demand`,demand);
    }
    RefuserDemande(demand : DemandeAchat):Observable<DemandeAchat>{
        return this.http.put<DemandeAchat>(`${this.localUrl}refuse-Demand`,demand);
       }


    getDemandeAchat(id:number):Observable<DemandeAchat>{
   return this.http.get<DemandeAchat>(`${this.localUrl}getId/${id}`)
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

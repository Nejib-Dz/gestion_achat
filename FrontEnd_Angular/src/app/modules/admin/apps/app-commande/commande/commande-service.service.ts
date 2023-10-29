import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeServiceService {

    localUrl: string ='http://localhost:8080/api/v1/commande/'
    //private _httpClient: any;
    constructor(private http: HttpClient) { }

    ajouterCommande(commande : any):Observable<any>{
     return this.http.post(`${this.localUrl}saveCommande`,commande);
    }
    updateCommand(commande : any):Observable<any>{
        return this.http.put(`${this.localUrl}updateCommande`,commande);
       }
    listCommands():Observable<any[]>{
      return this.http.get<any[]>(`${this.localUrl}getAll`)

    }
    deleteCommand(id:number):Observable<any>{
      return this.http.delete(`${this.localUrl}remove/${id}`)

    }
}

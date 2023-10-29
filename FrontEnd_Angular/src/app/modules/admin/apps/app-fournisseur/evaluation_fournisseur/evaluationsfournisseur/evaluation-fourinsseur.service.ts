import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evaluation } from 'app/modules/Models/Evaluation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluationFourinsseurService {

    localUrl: string ='http://localhost:8080/api/v1/evaluations'
    constructor(private http: HttpClient) { }
    private formData: number;

    setFormData(data: any) {
      this.formData = data;
    }
    //
    getFormData() {
      return this.formData;
    }

    listEvaluationByIdFour
    (id:number):Observable<Evaluation[]>{
      return this.http.get<Evaluation[]>(`${this.localUrl}/getListByIdFour/${id}`);
    }
    ajouterEvaluation
(frm : Evaluation):Observable<Evaluation>{
      return this.http.post<Evaluation>(`${this.localUrl}/save`,frm);
     }
     updateEvaluation(fr : Evaluation):Observable<Evaluation>{
        return this.http.put<Evaluation>(`${this.localUrl}/updatee`,fr);
       }
    listEvaluation
    ():Observable<Evaluation[]>{
      return this.http.get<Evaluation[]>(`${this.localUrl}/findByAll`)

    }
    deletEvaluation
    (id: number):Observable<Evaluation>{
      return this.http.delete<Evaluation>(`${this.localUrl}/removeFourn/${id}`)

    }

    getEvaluation
    Bydi(id:number):Observable<Evaluation>{
   return this.http.get<Evaluation>(`${this.localUrl}getById/${id}`)
    }
}

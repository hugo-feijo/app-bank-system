
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ContaInterface } from "../types/conta.interface";

@Injectable()
export class ContaService {

    constructor(private httpClient: HttpClient) {}
    
    findAll(): Observable<ContaInterface[]> {
      return this.httpClient.get<ContaInterface[]>(
        `${environment.apiUrl}/contas`
      )
    }

    save(cliente: ContaInterface): Observable<ContaInterface> {
      return this.httpClient.post<ContaInterface>(`${environment.apiUrl}/contas`, cliente);
    }

    update(cliente: ContaInterface, id: String): Observable<ContaInterface> {
      return this.httpClient.put<ContaInterface>(`${environment.apiUrl}/contas/${id}`, cliente);
    }

    delete(id: String): Observable<ContaInterface> {
      return this.httpClient.delete<ContaInterface>(`${environment.apiUrl}/contas/${id}`);
    }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ClienteInterface } from "../types/cliente.interface";

@Injectable()
export class ClientesService {

    constructor(private httpClient: HttpClient) {}
    
    findAll(): Observable<ClienteInterface[]> {
      return this.httpClient.get<ClienteInterface[]>(
        `${environment.apiUrl}/clientes`
      )
    }

    save(cliente: ClienteInterface): Observable<ClienteInterface> {
      return this.httpClient.post<ClienteInterface>(`${environment.apiUrl}/clientes`, cliente);
    }

    update(cliente: ClienteInterface, id: String): Observable<ClienteInterface> {
      return this.httpClient.put<ClienteInterface>(`${environment.apiUrl}/clientes/${id}`, cliente);
    }

    delete(id: String): Observable<ClienteInterface> {
      return this.httpClient.delete<ClienteInterface>(`${environment.apiUrl}/clientes/${id}`);
    }
}
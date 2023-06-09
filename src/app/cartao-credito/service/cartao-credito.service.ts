
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CartaoCreditoInterface } from "../types/cartao-credito.interface";

@Injectable()
export class CartaoCreditoService {

    constructor(private httpClient: HttpClient) {}
    
    findAll(): Observable<CartaoCreditoInterface[]> {
      return this.httpClient.get<CartaoCreditoInterface[]>(
        `${environment.apiUrl}/cartoes`
      )
    }

    save(cliente: CartaoCreditoInterface): Observable<CartaoCreditoInterface> {
      return this.httpClient.post<CartaoCreditoInterface>(`${environment.apiUrl}/cartoes`, cliente);
    }

    update(cliente: CartaoCreditoInterface, id: String): Observable<CartaoCreditoInterface> {
      return this.httpClient.put<CartaoCreditoInterface>(`${environment.apiUrl}/cartoes/${id}`, cliente);
    }

    delete(id: String): Observable<CartaoCreditoInterface> {
      return this.httpClient.delete<CartaoCreditoInterface>(`${environment.apiUrl}/cartoes/${id}`);
    }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class HomeService {

    constructor(private httpClient: HttpClient) {}
    
    findTotalCartao(): Observable<number> {
      return this.httpClient.get<number>(
        `${environment.apiUrl}/home/total-cartao`
      )
    }
    
    findTotalConta(): Observable<number> {
      return this.httpClient.get<number>(
        `${environment.apiUrl}/home/total-conta`
      )
    }

}
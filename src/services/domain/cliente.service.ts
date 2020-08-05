import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService{

    constructor(public http: HttpClient, public storage: StorageService){

    }

    findByEmail(email: string) : Observable<ClienteDTO> {

        //por hora vamos colocar o Authorization no header na mão
        //retirado depois que foi implementado o auth-interceptor.ts
        //let token = this.storage.getLocalUser().token;
        //let authHeader = new HttpHeaders({'Authorization' : 'Bearer ' + token});

        //fazendo request ao backend para pegar o cliente pelo email, colocando o Authorization acima
        //no Headers como argumento
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
        //retirado depois que foi implementado o auth-interceptor.ts
        //{'headers' : authHeader});
    }

    //metodo para pegar a imagem do profile no bucket
    getImageFromBucket(id: string) : Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType: 'blob'});
    }
}
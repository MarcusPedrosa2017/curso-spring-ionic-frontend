import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthService{

    constructor(public http: HttpClient){

    }

    authenticate(creds: CredenciaisDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            creds,
            {//aqui colocamos o response que vira do servico de autenticao do backend e dizemos que sera um texto
             //para que o framework nao tente fazer um parse para JSON, pois a resposta e no content   
                observe: 'response',
                responseType: 'text'
            });
    }
}
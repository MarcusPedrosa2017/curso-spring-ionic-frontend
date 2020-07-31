import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService{

    constructor(public http: HttpClient, public storage: StorageService){

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

    //metodo executado com for feito login com sucesso
    successfulLogin(authorization: String){
        //retiando a palavra "Bearer " do token que vira na resposta
         let tok = authorization.substring(7);
         //set o valor no nosso objeto de usuario
         let user : LocalUser = {
            token: tok
         };
         //armazenando o usuario no Local Storage, utilizando nosso StorageService
         this.storage.setLocalUser(user);
    }

    //metodo para remover o usuario no logout
    logout(){
        this.storage.setLocalUser(null);
    }
}
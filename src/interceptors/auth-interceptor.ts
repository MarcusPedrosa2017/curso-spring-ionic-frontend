import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { ErrorInterceptor } from "./error-interceptor";
import { StorageService } from "../services/storage.service";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(public storage : StorageService){        
    }


    //metodo que intercepta as requisicoes
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{   

        let localUser = this.storage.getLocalUser();

        //caso volte o usuario clonamos o request e acrescentamos as informacoes do Authorization
        //e propagamos a requisicao nova, do contrario vai para antiga, mas so colocamos isso para requisicoes
        //que vao para o backend, nao para o s3
        let N = API_CONFIG.baseUrl.length;
        let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;

        if(localUser && requestToAPI){
            const authReq = req.clone({headers: req.headers.set('Authorization','Bearer ' + localUser.token)});
            return next.handle(authReq);  
        }else{
            return next.handle(req);            
        }
    }     
}

//o framework exige a declaracao do Provider do Interceptor destas carcteristicas do interceptor para
    // que ele possa funcionar
export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
}
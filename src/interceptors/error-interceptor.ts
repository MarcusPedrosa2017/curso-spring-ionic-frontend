//classe que ira interceptar os erros e dar o tratamento necessario
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";//LEMBRAR SEMPRE DE ATUALIZAR PARA "/Rx"

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    //metodo que intercepta as requisicoes
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        //console.log("Passou no Interceptor");
        //aqui apenas deixa a requisicao seguir seu fluxo
        return next.handle(req)
        //caso de um erro, retorna o erro em questao para o controlador
        .catch((error, caught) => {

            //pegando o erro dentro da resposta
            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }            
            //se nao vier como JSON faz o parse
            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);

            return Observable.throw(errorObj);
            
        }) as any;
    }    
}

//o framework exige a declaracao do Provider do Interceptor destas carcteristicas do interceptor para que ele possa funcionar
export const ErrorInterceptorProvider = {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true,
};
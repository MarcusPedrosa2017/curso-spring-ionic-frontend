//classe que ira interceptar os erros e dar o tratamento necessario
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";//LEMBRAR SEMPRE DE ATUALIZAR PARA "/Rx"
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(
        public storage: StorageService,
        //colocamos o aAertController
        public alertCtrl : AlertController){        
    }

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

            //tratamentos especificos
            switch(errorObj.status){

                case 401:
                this.handle401();
                break;

                case 403:
                this.handle403();
                break;

                default:
                this.handleDefualtError(errorObj);
            }

            return Observable.throw(errorObj);
            
        }) as any;
    } 
    
    //remove usuario do local storage
    handle403(){
        this.storage.setLocalUser(null);
    }

    //
    handle401(){
        //criando o alert
        let alert = this.alertCtrl.create({
            title: 'Erro 401: falha de autenticação',
            message: 'Email ou senha incorretos',
            //propriedade que obriga abertar no botao do alert para sair dele
            enableBackdropDismiss: false,
            //definicao dos botoes do alert
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        //apresenta o alert
        alert.present();
    }

    handleDefualtError(errorObj){
        //criando o alert
        let alert = this.alertCtrl.create({
            title: 'Erro ' + errorObj.status +  ': ' + errorObj.error,
            message: errorObj.message,
            //propriedade que obriga abertar no botao do alert para sair dele
            enableBackdropDismiss: false,
            //definicao dos botoes do alert
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        //apresenta o alert
        alert.present();
    }
}

//o framework exige a declaracao do Provider do Interceptor destas carcteristicas do interceptor para que ele possa funcionar
export const ErrorInterceptorProvider = {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true,
};
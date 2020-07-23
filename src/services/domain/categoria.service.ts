//esse importe e para que se possa injetar em outros lugares
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../config/api.config';
import { CategoriaDTO } from '../../models/categoria.dto';
//o visual studio importa errado, temos que acertar para 'rxjs/Rx' e nao o abaixo
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CategoriaService {

    constructor (public http: HttpClient){
    }

    //metodo para chamar o endpoint de categorias do backend
    //ele retorno um list de CategoriaDTO
    //o retorno das chamadas AJAX do angular são asincronos e isso e encapsulado em um Observable por isso 
    //iremos retornar um list Observable de CategoriaDTO
    public findAll() : Observable<CategoriaDTO[]> {
        //utilizando a CRASE pode concatenar a variavel de base de url sem utilizar o sinal de MAIS
        //colocamos o retorno da funcao GET tipada pelo que vai retornar <CategoriaDTO[]>
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias/listar`);
    }
}
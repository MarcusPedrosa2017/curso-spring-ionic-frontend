import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { nullSafeIsEquivalent } from "@angular/compiler/src/output/output_ast";

@Injectable()
export class StorageService{

    getLocalUser() : LocalUser{
        //pegando o usuario armazanado no storageLocal do HTML5
        let user = localStorage.getItem(STORAGE_KEYS.localUser);
        //caso seja nulo volta nulo
        if(user == null){
            return null;
        }else{
            //fazemos o parse para o nosso objeto, pois o storage armazena um mapper chave valor de string
            return JSON.parse(user);
        }

    }

    setLocalUser(obj: LocalUser){
        //caso o objeto seja nulo removemos do storage 
        if(obj == null){
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }else{
            //para armazenar fazemos o parse para String
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

}
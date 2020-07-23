import { Component } from '@angular/core';
//e necessario incluir aqui o IonicPage no import
import { NavController, IonicPage } from 'ionic-angular';

//decorator necessario para poder referenciar a classe pelo seu nome entre aspas 'HomePage' 
//para fazer o Lazy load
@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //para navegar entre paginas iremos utilizar o NavController que neste caso ja esta injetado no construtor
  //abaixo como parametro
  constructor(public navCtrl: NavController) {

  }

  //criando o metodo de login
  public login(){
    //vamos utilizar o NavController para ir para pagina de categorias ao fazer o login por hora
    //para utilizar o objeto injetado e necessario usar a palavra "this"
    //o metodo push empilha uma pagina sobre a outra
    //this.navCtrl.push('CategoriasPage');

    //trocamos para setRoot ao inves do push para que aparece o menu e nao a seta de paginas empilhadas
    this.navCtrl.setRoot('CategoriasPage');
  }

}

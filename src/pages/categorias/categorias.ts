import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  //variavel que ira receber o list de categorias
  items: CategoriaDTO[];

  //criando variavel para utilizar a url do bucket no template html
  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {
    //utilizando o evento de fim de carregamento para listar as categorias que retornaram da chamada 
    //asincrona ao CategoriaService, por isso se registramos aguardando o retorno com o ".subcribe"
    //e quando retornar iremos usar uma funcao de callback utilizando uma funcao anonyma no estilo 
    //arrow function que recebe um response e imprime no console esse response no caso de sucesso
    //e caso de erro recebe outra funcao como argumento e imprime o erro
    this.categoriaService.findAll()
        .subscribe(response => {
          this.items = response;
        },
        //funcao de erro
        error => {
          console.log(error);
        });
    
  }

}

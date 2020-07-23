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

  constructor(public navCtrl: NavController) {

  }

}

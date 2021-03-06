import { Component } from '@angular/core';
//e necessario incluir aqui o IonicPage no import
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

//decorator necessario para poder referenciar a classe pelo seu nome entre aspas 'HomePage' 
//para fazer o Lazy load
@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //objeto do login istanciado vazio
  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  }

  //para navegar entre paginas iremos utilizar o NavController que neste caso ja esta injetado no construtor
  //abaixo como parametro
  //foi injetado o MenuController para poder desabilitar o menu da home estando na home
  //foi injetado o AuthService para poder fazer a autenticacao no backend
  constructor(
    public navCtrl: NavController, 
    public menu: MenuController, 
    public auth: AuthService) {

  }

  //usando os eventos do lifecycle events, vamos usar os metodos padroes para desabilitar e menu home
  //este metodo vai desabilitar o menu quando a home for carregada
  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  //este metodo carrega o menu novamente quando sair da home
  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  //este metodo carrega 
  ionViewDidEnter(){
    this.auth.refreshToken()
      .subscribe(response => {
        //console.log(response.headers.get('Authorization'));
        this.auth.successfulLogin(response.headers.get('Authorization'));
        //vamos utilizar o NavController para ir para pagina de categorias ao fazer o login por hora
        //para utilizar o objeto injetado e necessario usar a palavra "this"
        //o metodo push empilha uma pagina sobre a outra
        //this.navCtrl.push('CategoriasPage');
        //trocamos para setRoot ao inves do push para que aparece o menu e nao a seta de paginas empilhadas
        this.navCtrl.setRoot('CategoriasPage');
        
    },//caso ocorra algum erro nao faz nada
    error =>{})
  }

  

  //criando o metodo de login
  public login(){
    
    //fazemos a autenticacao no backend e logamos o header Authorization
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        //console.log(response.headers.get('Authorization'));
        this.auth.successfulLogin(response.headers.get('Authorization'));
        //vamos utilizar o NavController para ir para pagina de categorias ao fazer o login por hora
        //para utilizar o objeto injetado e necessario usar a palavra "this"
        //o metodo push empilha uma pagina sobre a outra
        //this.navCtrl.push('CategoriasPage');
        //trocamos para setRoot ao inves do push para que aparece o menu e nao a seta de paginas empilhadas
        this.navCtrl.setRoot('CategoriasPage');
        
    },//caso ocorra algum erro nao faz nada
    error =>{})

    console.log(this.creds);

  }

}

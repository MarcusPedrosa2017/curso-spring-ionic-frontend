import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //variavel que guarda a pagina de home, estava com tipo any mudamos para string para referenciar entre ''
  //rootPage: any = HomePage;
  rootPage: string = 'HomePage';

  //tambem mudamos para string o component que estava como any
  //pages: Array<{title: string, component: any}>;
  pages: Array<{title: string, component: string}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public authService: AuthService) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      //aqui tambem colocamos entre aspas a referencia do component
      { title: 'Profile', component: 'ProfilePage' },
      { title: 'Categorias', component: 'CategoriasPage' },
      { title: 'Logout', component: '' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  //foi tipado o argumento page para que se possa tratar o Logout
  openPage(page : {title:string, component:string}) {
    
    switch (page.title){
      case 'Logout':
        this.authService.logout();//apaga o usuario do storageLocal, fazendo o logout
        this.nav.setRoot('HomePage');//redireciona para a home
        break;
      
      default:
        this.nav.setRoot(page.component);
    }    
  }

}

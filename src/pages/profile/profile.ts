import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  //email: string;
  cliente : ClienteDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: StorageService,
    public clienteService : ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      //this.email = localUser.email;
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response;
          //buscar a imagem do perfil do bucket
          this.getImageIfExists();
        },
        error =>{
          //caso de 403 no login manda para HomePage
          if(error.status == 403){
            this.navCtrl.setRoot('HomePage');
          }
        });
    }else{
      //caso de erro tbm manda para home
      this.navCtrl.setRoot('HomePage');
    }
  }

  //metodo que seta a url da imagem do profile caso exista no bucket
  getImageIfExists(){
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response =>{
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`
      },
      error =>{});
  }

}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public userData: any;
  public usersList: Object;
  public url:string="https://www.ikidoguikibati.org/webServiceM.php";

  constructor(public modalController: ModalController,
    private navCtrl:NavController,public toastController: ToastController,
    private http:HttpClient,public router:Router) {

      let uData=JSON.parse(localStorage.getItem('userJSON'));
      if(uData){
        this.userData=JSON.parse(localStorage.getItem('userJSON'));
        this.getData();

      }else{
        this.navCtrl.navigateRoot('login-page');
      }

    }
  getData() {
    let body = {serviceName:"getUsers",myId:this.userData.id};
    this.http.post(this.url,body).subscribe(data=>{
      console.log("Gelen Data"+data);
      this.usersList = data;
  })
  }

} 

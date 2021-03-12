import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
})
export class SingUpComponent implements OnInit {
  public name:string;
  public title:string;
  public password:string;
  public email:string;
  public url:string="https://www.ikidoguikibati.org/webServiceM.php";

  constructor(public modalController: ModalController,private http:HttpClient,public toastController: ToastController) { }

  ngOnInit() {}

  Save(){
    let body = {serviceName:"singUp",ad:this.name,title:this.title,email:this.email,sifre:this.password}
    this.http.post(this.url,body).subscribe(data=>{
      if(data==0){this.presentToast("Kaytli kullanica","danger");}
      else{
        localStorage.setItem('userJSON',JSON.stringify(data[0]));
        this.presentToast("Basarili kaydetildi","success");
        
       this.dismiss();
      }
      
      
    })
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

    //Uyari
  async presentToast(mesaj,renk) {
      const toast = await this.toastController.create({
        message: mesaj,
        color:renk,
        position:'top',
        duration: 2000
      });
      toast.present();
    }

}

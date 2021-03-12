import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController,NavController } from '@ionic/angular';
import { SingUpComponent } from '../modals/sing-up/sing-up.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
  public folder: any;
  public username:string;
  public password:string;
  public url:string='https://www.ikidoguikibati.org/webServiceM.php';
  userData: any=[];
  public path:string="";
  

  constructor(public router:Router,private activatedRoute: ActivatedRoute,
    public modalController: ModalController,
    private navCtrl:NavController,
    private http:HttpClient,public toastController: ToastController) {
      let uData=JSON.parse(localStorage.getItem('userJSON'));
      if(uData){
        this.userData=JSON.parse(localStorage.getItem('userJSON'));
        this.navCtrl.navigateRoot('tabs');

      }else{
        this.navCtrl.navigateRoot('login-page');
      }


     }

  ngOnInit() {
   // this.folder = this.activatedRoute.snapshot.paramMap.get('login-page');
  }


login(){
    console.log(this.username+" " +this.password);
    let body = {serviceName:"login",email:this.username,sifre:this.password}
    this.http.post('https://www.ikidoguikibati.org/webServiceM.php',body).subscribe(data=>{
      if(data==0){this.presentToast("Hatali giris","danger");this.navCtrl.navigateRoot('login-page');}
      else{
        this.userData= data[0];
        localStorage.setItem('userJSON',JSON.stringify(this.userData));
        this.presentToast("Hosgeldin "+this.userData.adi_soyad,"success");
        this.navCtrl.navigateRoot('tabs');
      }
      
      
    })
    
  
  }

//Sing Up modal
  async singUp() {
    const modal = await this.modalController.create({
      component:  SingUpComponent,
      cssClass: 'my-custom-class'
    });
   modal.onDidDismiss().then(saveData=>{
     console.log("Kapattilar beni");
     

   })
    return await modal.present();
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

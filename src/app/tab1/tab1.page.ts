import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AddListComponent } from '../modals/add-list/add-list.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public todoneList:any;
  public url:string="https://www.ikidoguikibati.org/webServiceM.php";
  userData: any=[];
  

  constructor(public modalController: ModalController,
    private navCtrl:NavController,public toastController: ToastController,
    private http:HttpClient,public router:Router) {

      let uData=JSON.parse(localStorage.getItem('userJSON'));
      if(uData){
        this.userData=JSON.parse(localStorage.getItem('userJSON'));
        this.getData('');

      }else{
        this.navCtrl.navigateRoot('login-page');
      }
  }

  
//add rapor Modal
async addList() {
    const modal = await this.modalController.create({
      component:  AddListComponent,
      cssClass: 'my-custom-class'
    });
   modal.onDidDismiss().then(saveData=>{
     console.log("Kapattilar beni");
     
        if(saveData.data.status){
          console.log("Ekleme yapilacak");
          let body = {serviceName:"toDoneAdd",isin_adi:saveData.data.isin_adi,isi_yapanlar:saveData.data.isi_yapanlar,
          yararlanicilar:saveData.data.yararlanicilar,yapildigi_yer:saveData.data.yapildigi_yer,
          faydalanici_sayisi:saveData.data.faydalanici_sayisi,aciklama:saveData.data.aciklama,
          y_gun:saveData.data.y_gun,y_saat:saveData.data.y_saat,
          user_id:this.userData.id}
          this.http.post(this.url,body).subscribe(data=>{
            
            this.todoneList = data;
            this.presentToast("Kayit Eklendi ","success");
          })
        }
     

   })
    return await modal.present();
  }
//Connetc db and chek data
getData(word){
    if(word!=''){
      this.todoneList=[];
    }
    let body = {serviceName:"getRapor",searchW:word};
    this.http.post(this.url,body).subscribe(data=>{
      console.log("Gelen Data"+data);
      this.todoneList = data;
   })
 
    

 
}
//Open details
detailsOpen(item){
  console.log(item);
  this.router.navigate(['detail',JSON.stringify(item)]);
}
// Toast
async presentToast(mesaj,renk) {
  const toast = await this.toastController.create({
    message: mesaj,
    color:renk,
    position:'top',
    duration: 2000
  });
  toast.present();
}

//searrch

search(word){
  this.todoneList=[];
    let body = {serviceName:"searchData",searchW:word};
    this.http.post(this.url,body).subscribe(data=>{
      console.log("Gelen Data"+data);
    this.todoneList = data;
 })
}

/*delete(item){
  console.log(item);
  const deleteD = item.isin_adi;
  console.log(deleteD);
  let body = {serviceName:"deleteData",isin_adi:deleteD};
  this.http.post(this.url,body).subscribe(data=>{
   
    this.todoneList = data;
    this.presentToast("Kayit Silindi","danger");
 })
}
*/
// Logout
logout(){
  this.userData=[];
  localStorage.clear();
  this.router.navigate(['login-page']);
}


}

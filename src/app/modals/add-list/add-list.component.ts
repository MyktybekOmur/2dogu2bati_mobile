import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss'],
})
export class AddListComponent implements OnInit {
  public todoAddStatus: boolean=false;
  public isin_adi:string;
  public isi_yapanlar:string;
  public yararlanicilar:string;
  public yapildigi_yer:string;
  public faydalanici_sayisi:string;
  public aciklama:string;
  public y_gun:any;
  public y_saat:any;

  

  constructor(public modalController: ModalController,private http:HttpClient,public toastController: ToastController) { }

  ngOnInit() {}


todoAdd(){
    this.todoAddStatus = true;
    this.dismiss();
  }


dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true,
      'status':this.todoAddStatus,
      'isin_adi':this.isin_adi,
      'isi_yapanlar':this.isi_yapanlar,
      'yararlanicilar':this.yararlanicilar,
      'yapildigi_yer':this.yapildigi_yer,
      'faydalanici_sayisi':this.faydalanici_sayisi,
      'aciklama':this.aciklama,
      'y_gun':this.y_gun,
      'y_saat':this.y_saat

    });
  }
}

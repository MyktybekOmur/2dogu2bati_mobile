import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public bilgi: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.bilgi = JSON.parse(this.activatedRoute.snapshot.paramMap.get('getData'));
    console.log("Gelen Veri:"+this.bilgi);
  }

}

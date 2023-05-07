import { Component } from '@angular/core';
import { ShopObject } from 'src/app/shared/constants/constants';
import { ShopService } from 'src/app/shared/services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

  shopObject?: Array<any>;
  chosenImage: any;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void{
    this.shopService.loadImageMeta('').subscribe(data => {
      this.shopObject = data;
    })
  }

  loadImage(imageObject: any) {
    this.chosenImage = imageObject;
  }
}

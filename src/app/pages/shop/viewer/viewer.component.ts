import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Comment } from '../../../shared/models/Comment';
import { ShopService } from '../../../shared/services/shop.service';
import { Image } from 'src/app/shared/models/Image';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {

  @Input() imageInput?: Image;
  loadedImage?: string;
  comments: Array<any> = [];

  commentsForm = this.createForm({
    username: "",
    comment: "",
    date: new Date()
  })

  constructor(private fb: FormBuilder, private router: Router, private shopService: ShopService) {

  }

  ngOnChanges(): void{
    if (this.imageInput?.image_url != null) {
      const imageurlValue = this.imageInput?.image_url || '';
      this.shopService.loadImage(imageurlValue).subscribe(data => {
        this.loadedImage = data;
      });
    }
  }

  ngOnInit(): void {

  }

  createForm(model: Comment) {
    return this.fb.group(model);
  }

  addOrder() {
    if (this.commentsForm.get('username') && this.commentsForm.get('comment')) {
      this.commentsForm.get('date')?.setValue(new Date());

      this.comments.push({ ...this.commentsForm.value });

      this.router.navigateByUrl('/shop/successful');
    }
    else{
      this.router.navigateByUrl('/shop/successful');
    }
  }

}

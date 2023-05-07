import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Image } from '../models/Image';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  collectionName = 'Images';

  constructor( private storage: AngularFireStorage, private afs: AngularFirestore) { }

  loadImageMeta(metaUrl: string): Observable<Array<Image>> {
    return this.afs.collection<Image>(this.collectionName).valueChanges();
  }
  loadImage(imageUrl: string){
    return this.storage.ref(imageUrl).getDownloadURL();
  }
}

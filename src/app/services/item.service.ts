import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Item } from '../models/item';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  itemsCollection: AngularFirestoreCollection<Item>
  itemDoc: AngularFirestoreDocument<Item>
  items:Observable<Item[]>

  constructor(public afs: AngularFirestore) {
    //this.items=this.afs.collection('items').valueChanges()

    this.itemsCollection=afs.collection('items');

    this.items=this.itemsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
   }

   getItems(){
    return this.items;
   }

   addItem(item: Item){
     this.itemsCollection.add(item)
   }

   updateItem(item: Item){
      this.itemDoc = this.afs.doc(`items/${item.id}`)
      this.itemDoc.update(item)
   }
}



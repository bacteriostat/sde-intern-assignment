import { Component, OnInit } from '@angular/core';
import {ItemService} from '../../services/item.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[];  //stores all the previous entries

  constructor(private itemService: ItemService) { }

  ngOnInit() {

    //Get all previous entries.
    this.itemService.getItems().subscribe(items => {
      //console.log(items)
      this.items = items;
    })
  }

  updateItem(event, item: Item){
    item.status="checked out"

    //Get current time in IST.
    var currentTime = new Date();
    var currentOffset = currentTime.getTimezoneOffset();
    var ISTOffset = 330;   // IST offset UTC +5:30 
    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

    // ISTTime now represents the time in IST coordinates
    var hoursIST = ISTTime.getHours()
    var minutesIST = ISTTime.getMinutes()
    item.checkOutTime=hoursIST + ":" + minutesIST + " IST"

    //Send email to visitor
    var EmailText=item.name+"\n"+item.email+"\n"+item.phone+"\n"+item.checkInTime+"\n"+item.checkOutTime+"\n"+item.host_name+"\n"+item.address;
    this.sendEmail(EmailText, item.host_email);

    //Push to firebase
    this.itemService.updateItem(item);
  }

  sendEmail(EmailText: String, email_address: String){
    // To send emails, access to premium features of Firebase is needed. 
    // It can be implemented and used here.
  }
}

import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})
export class AddItemsComponent implements OnInit {


  item: Item = {
    name:'',
    email:'',
    phone:'',
    status:'',
    checkInTime:'',
    checkOutTime:'',
    address:'',
    host_name:'',
    host_email:'',
    host_phone:''
  }

  constructor(private  itemService: ItemService) { }

  ngOnInit() {}

  //When submit button is pressed
  onSubmit(){
    if(this.item.address != '' && this.item.host_name != '' && this.item.host_phone != '' && this.item.host_email != '' && this.item.name != '' && this.item.email != '' && this.item.phone != ''){
      this.item.status='Checked In'

      //Get current time in IST
      var currentTime = new Date();
      var currentOffset = currentTime.getTimezoneOffset();
      var ISTOffset = 330;   // IST offset UTC +5:30 
      var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

      // ISTTime now represents the time in IST coordinates
      var hoursIST = ISTTime.getHours()
      var minutesIST = ISTTime.getMinutes()
      this.item.checkInTime=hoursIST + ":" + minutesIST + " IST"

      //send email and sms
      var SMSText=this.item.name+"\n"+this.item.email+"\n"+this.item.phone+"\n"+this.item.checkInTime;
      var EmailText=this.item.name+"\n"+this.item.email+"\n"+this.item.phone+"\n"+this.item.checkInTime;
      this.sendSMS(SMSText, this.item.host_phone);
      this.sendEmail(EmailText, this.item.host_email);

      //Push to Firebase
      this.itemService.addItem(this.item);

      //Clear the fields for new check-in(s)
      this.item.status='';
      this.item.email='';
      this.item.name='';
      this.item.phone='';
      this.item.checkInTime='';
      this.item.checkOutTime='';
      this.item.address='';
      this.item.host_email='';
      this.item.host_name='';
      this.item.host_phone='';
    }
  }

  sendSMS(SMSText: String, number: String){
    // To send messages, access to premium API like Twilio is needed. 
    // It can be implemented and used here.
  }

  sendEmail(EmailText: String, email_address: String){
    // To send emails, access to premium features of Firebase is needed. 
    // It can be implemented and used here.
  }

}

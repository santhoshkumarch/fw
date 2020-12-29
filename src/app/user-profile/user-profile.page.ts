import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { SqliteServiceService } from '../databaseService/sqlite-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  customerForm: FormGroup;
  customerType: any;
  cusomentDay: any;
  cusomentPayType: any;
  cusomentMobile: any;
  cusomentCity: any;
  cusomentArea: any;
  cusomentAddress: any;
  constructor(
    private fb: FormBuilder,
    private sqlite: SQLite,
    private platform: Platform,
    private sqlPorter: SQLitePorter,
    private db: SqliteServiceService,
  ) { }

  ngOnInit() {
    this.db.dbState().subscribe(res => {
      console.log("DB", res);
    })
    this.customerForm = this.fb.group({
      customerType : new FormControl(''),
      customerName : new FormControl(''),
      customerAddress : new FormControl(''),
      customerArea : new FormControl(''),
      customerCity : new FormControl(''),
      customerMobile : new FormControl(''),
      customerPaymentType : new FormControl(''),
      customerDay : new FormControl(''),      
    })
  }

  getCustomerType(event){
this.customerType = event.target.value;
  }
  getCustomerName(event){
this.cusomentArea = event.target.value;
  }
  getCustAddress(event){
    this.cusomentAddress = event.target.value;
  }
  getCustArea(event){
    this.cusomentArea = event.target.value;
  }
  getCustCity(event){
    this.cusomentCity = event.target.value;
  }
  getCustMobile(event){
    this.cusomentMobile = event.target.value;
  }
  getCustPaymentType(event){
    this.cusomentPayType = event.target.value;
  }
  getCustometDay(event){
    this.cusomentDay = event.target.value;
  }

  storeData() {
    this.db.addCustomer(
      this.customerForm.value.customerType,
      this.customerForm.value.customerName,
      "11/09/1990",
      this.customerForm.value.customerAddress,
      this.customerForm.value.customerArea,
      this.customerForm.value.customerCity,
      "6000011",
      this.customerForm.value.customerMobile,
      "santhosh@gmailcom",
      this.customerForm.value.customerPaymentType,
      this.customerForm.value.customerDay,
    ).then((res) => {
      this.customerForm.reset();
    })
  }
  resetForm(){
    this.customerForm.reset();
  }
}

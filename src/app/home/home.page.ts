import { trigger,state, style, transition, animate, keyframes } from '@angular/animations';
import { Component} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import Swal from 'sweetalert2';
import { HomeService } from './home.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  animations: [

    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0'}),
        animate('3000ms ease-in-out')
      ])
    ]),

    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0)'}),
        animate('2000ms ease-in-out')
      ])
    ]),

    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('3000ms 300ms ease-in', keyframes([
          style({transform: 'translate3d(0,2000px,0)', offset: 0}),
          style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
          style({transform: 'translate3d(0,0,0)', offset: 1}) 
        ]))
      ])
    ]),

    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('2000ms 3000ms ease-in')
      ])
    ])
  ],
  styleUrls: ['home.page.scss'],
  providers: [HomeService]
})
export class HomePage {
  fwp_category : string = `create table IF NOT EXISTS fwp_category ( fwp_cat_code	bigint	not null primary key, fwp_cat_name nvarchar(40)	not null)`;
  fwp_unit: string = `create table fwp_unit
  (
    fwp_unit_code			bigint			not null primary key,
    fwp_unit_name			nvarchar(40)	not null
  )`;
  fwp_product : string = `create table fwp_product
  (
    fwp_pro_code				bigint				not null primary key,
    fwp_pro_name				nvarchar(40)		not null,
    fwp_pro_subproduct			nvarchar(1)			not null,
    fwp_pro_unitcode			bigint				not null,
    fwp_pro_catcode				bigint				not null,
    fwp_pro_tagtype				nvarchar(1)			not null,
    FOREIGN KEY (fwp_pro_unitcode)
    REFERENCES fwp_unit (fwp_unit_code),
    FOREIGN KEY (fwp_pro_catcode)
    REFERENCES fwp_category (fwp_cat_code)
  )`;

  fwp_subproduct: string = `create table fwp_subproduct
  (
    fwp_sub_code				bigint				not null primary key,
    fwp_sub_name				nvarchar(40)		not null,
    fwp_sub_procode				bigint				not null,
    FOREIGN KEY (fwp_sub_procode)
    REFERENCES fwp_product (fwp_pro_code)
  )`;

  fwp_tax: string = `create table fwp_tax
  (
    fwp_tax_code				bigint				not null primary key,
    fwp_tax_name				nvarchar(40)		not null,	
    fwp_tax_per					numeric(10, 2)		not null,
    fwp_tax_type				nvarchar(4)			not null		
  )`;

  fwp_hsn: string = `create table fwp_hsn
  (
    fwp_hsn_code				nvarchar(20)		not null primary key,
    fwp_hsn_name				nvarchar(40)		not null
  )`;

  fwp_hsn_tax: string = `create table fwp_hsn_tax
  (
    fwp_hsn_tax_code				INTEGER				not null primary key autoincrement,
    fwp_hsn_tax_hsncode				nvarchar(20)		not null,
    fwp_hsn_tax_salesamount			numeric(18, 2)		null,
    fwp_hsn_tax_belowsgstcode		bigint				not null,
    fwp_hsn_tax_belowcgstcode		bigint				not null,		
    fwp_hsn_tax_belowigstcode		bigint				not null,	
    fwp_hsn_tax_belowsrvcode		bigint				not null,	
    fwp_hsn_tax_abovesgstcode		bigint				not null,
    fwp_hsn_tax_abovecgstcode		bigint				not null,		
    fwp_hsn_tax_aboveigstcode		bigint				not null,		
    fwp_hsn_tax_abovesrvcode		bigint				not null,
    FOREIGN KEY (fwp_hsn_tax_hsncode)
    REFERENCES fwp_hsn (fwp_hsn_code),
    FOREIGN KEY (fwp_hsn_tax_belowsgstcode)
    REFERENCES fwp_tax (fwp_tax_code),
    FOREIGN KEY (fwp_hsn_tax_belowcgstcode)
    REFERENCES fwp_tax (fwp_tax_code),
    FOREIGN KEY (fwp_hsn_tax_belowigstcode)
    REFERENCES fwp_tax (fwp_tax_code),
    FOREIGN KEY (fwp_hsn_tax_belowsrvcode)
    REFERENCES fwp_tax (fwp_tax_code),
    FOREIGN KEY (fwp_hsn_tax_abovesgstcode)
    REFERENCES fwp_tax (fwp_tax_code),
    FOREIGN KEY (fwp_hsn_tax_abovecgstcode)
    REFERENCES fwp_tax (fwp_tax_code),
    FOREIGN KEY (fwp_hsn_tax_aboveigstcode)
    REFERENCES fwp_tax (fwp_tax_code),
    FOREIGN KEY (fwp_hsn_tax_abovesrvcode)
    REFERENCES fwp_tax (fwp_tax_code)
  )`;

  fwp_hsn_product: string = `create table fwp_hsn_product
  (
    fwp_hsn_pro_code				bigint				not null,	
    fwp_hsn_pro_hsncode				nvarchar(20)		not null,
    FOREIGN KEY (fwp_hsn_pro_code)
    REFERENCES fwp_product (fwp_pro_code),
    FOREIGN KEY (fwp_hsn_pro_hsncode)
    REFERENCES fwp_hsn (fwp_hsn_code)
  )`;

  fwp_rate: string = `Create table fwp_rate
  (
    fwp_rat_code					bigint				not null primary key,
    fwp_rat_procode					bigint				not null,
    fwp_rat_subcode					bigint				not null,
    fwp_rat_brncode					bigint				not null,
    fwp_rat_mrprate					numeric(15, 2)		not null,
    fwp_rat_selllingrate			numeric(15, 2)		not null,
    FOREIGN KEY (fwp_rat_procode)
    REFERENCES fwp_product (fwp_pro_code)
  )`;

  fwp_paymentmode: string = `create table fwp_paymentmode
  (
    fwp_pay_name						nvarchar(30)		not null,
    fwp_pay_code						nvarchar(2)			not null primary key,
    fwp_pay_disporder					int					not null
  )`;

  fwp_state: string = `create table fwp_state
  (
    fwp_sta_code				bigint				not null primary key,
    fwp_sta_name				nvarchar(40)		not null
  )`;

  fwp_customer: string = `create table fwp_customer
  (
    fwp_cus_code				bigint				not null primary key,
    fwp_cus_name				nvarchar(40)		not null,
    fwp_cus_dtofbirth			date				null,
    fwp_cus_address				nvarchar(50)		not null default '',
    fwp_cus_area				nvarchar(20)		not null default '',
    fwp_cus_city				nvarchar(20)		not null default '',
    fwp_cus_pincode				nvarchar(15)		not null default '',
    fwp_cus_mobileno			nvarchar(15)		not null,
    fwp_cus_mailid				nvarchar(20)		not null,
    fwp_cus_paymenttype			int					not null,
    fwp_cus_day					int					not null
  )`;

  fwp_controldetails: string = `create table fwp_controldetails
  (
    fwp_con_code					nvarchar(20)		not null,
    fwp_con_name					nvarchar(100)		not null,
    fwp_con_type					nvarchar(1)			not null,
    fwp_con_long					int					not null,
    fwp_con_double					numeric(15,2)		not null,
    fwp_con_text					nvarchar(200)		not null,
    fwp_con_length					int					not null,
    fwp_con_date					date				null								
  )`;

  fwp_fn_day: string = `create table fwp_fn_day
  (
    Name nvarchar(20),
    value int
  )`;

  fwp_fn_paymenttype: string = `create table fwp_fn_paymenttype
  (
    Name nvarchar(20),
    value int
  )`;



  databaseObj: SQLiteObject;
  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";
  SignupForm:FormGroup;
  userName: string;
  passWord: string;
  readonly database_name: string = "fieldWorks.db";
  
  constructor(
    private sqlite: SQLite,
    private route: Router,
    private homeService: HomeService,
    private fb: FormBuilder
  ) {}
  ngOnInit(){
    
    this.SignupForm = this.fb.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
    
  }
  gotoLogin(){
    
  }

  getLogin(){
    this.route.navigateByUrl('/login');
    // this.createDB();
    // this.homeService.getLogin(this.userName, this.passWord).subscribe(res => {
    //   console.log("resp", res);
    //   if(res.result === 'Success'){
    //     this.route.navigateByUrl('/login');
    //   } else {
    //     Swal.fire({
    //       text: res.result,
    //       icon: 'error',
    //     })
    //   }
    // },
    // )
  }

  createDB() {
    this.sqlite.create({
      name: this.database_name,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
        alert('freaky_datatable Database Created!');
        this.createTable()
      })
      .catch(e => {
       alert("error " + JSON.stringify(e))
      });
  }

  async createTable() {
    console.log("yu");
    await this.databaseObj.executeSql(this.fwp_category,[])
    await this.databaseObj.executeSql(this.fwp_unit,[])
    await this.databaseObj.executeSql(this.fwp_product,[])
    await this.databaseObj.executeSql(this.fwp_subproduct,[])
    await this.databaseObj.executeSql(this.fwp_tax,[])
    await this.databaseObj.executeSql(this.fwp_hsn,[])
    await this.databaseObj.executeSql(this.fwp_hsn_tax,[])
    await this.databaseObj.executeSql(this.fwp_hsn_product,[])
    await this.databaseObj.executeSql(this.fwp_rate,[])
    await this.databaseObj.executeSql(this.fwp_paymentmode,[])
    await this.databaseObj.executeSql(this.fwp_state,[])
    await this.databaseObj.executeSql(this.fwp_customer,[])
    await this.databaseObj.executeSql(this.fwp_controldetails,[])
    await this.databaseObj.executeSql(this.fwp_fn_day,[])
    await this.databaseObj.executeSql(this.fwp_fn_paymenttype,[])
    .then(() => {
      alert('Table Created!');
    })
    .catch(e => {
      alert("error " + JSON.stringify(e))
    });

  }

}

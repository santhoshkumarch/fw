import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { SqliteServiceService } from '../databaseService/sqlite-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [SqliteServiceService]
})
export class LoginPage implements OnInit {
  databaseObj: SQLiteObject;
  name_model: string = "";
  row_data: any = [];
  readonly database_name: string = "fieldWorks.db";
  readonly table_name: string = "fwp_category";

  updateActive: boolean;
  to_update_item: any;
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  storage: SQLiteObject;
  Data: any[] = [];
  mainForm: FormGroup;
  constructor(
    private router: Router,
    private sqlite: SQLite,
    private platform: Platform,
    private sqlPorter: SQLitePorter,
    private db: SqliteServiceService,
    public formBuilder: FormBuilder,
  ) {
    
  }
  ngOnInit() {
    this.db.dbState().subscribe(res => {
      console.log("DB", res);
      if(res){
        this.db.fetchSongs().subscribe(item => {
          this.Data = item
          console.log("data", this.Data);
        })
      }
    })
    this.platform.ready().then(() => {
    }).catch(error => {
      console.log(error);
    })
    this.mainForm = this.formBuilder.group({
      artist: [''],
      song: ['']
    })
    }

    storeData() {
      this.db.addSong(
        this.mainForm.value.artist,
        this.mainForm.value.song
      ).then((res) => {
        this.mainForm.reset();
      })
    }

  goToorder(){
    this.router.navigateByUrl('/customer')
  }
  gotocart(){
    this.router.navigateByUrl('/cart')
  }
  gotoSales(){
    this.router.navigateByUrl('/sales')
  }

  // getDatas(){
  //   console.log("Come on Kai Pulla")
  //   this.sqlite.create({
  //     name: 'test',
  //     location: 'default'
  //   }).then((db: SQLiteObject) => {
  //     db.executeSql('create table ')
  //   })
  // }

  insertDate() {
    let data = [1,"testData"];
    this.databaseObj.executeSql(`INSERT INTO fwp_category (fwp_cat_code, fwp_cat_name) VALUES (?, ?)`,data)
    .then(() => {
      alert('Data Inserted!');
    })
    .catch(e => {
      alert("error " + JSON.stringify(e))
    });
  }

  getData(){
    this.databaseObj.executeSql(`SELECT * FROM ${this.table_name}`, [])
    .then ((res) => {
      this.row_data = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          this.row_data.push(res.rows.item(i));
      }
    }
    });
  }

}

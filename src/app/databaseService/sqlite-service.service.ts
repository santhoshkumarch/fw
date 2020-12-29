import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SqliteServiceService {
storage: SQLiteObject;
datasList = new BehaviorSubject([]);
isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
readonly database_name: string = "fieldWorks.db";
constructor(
  private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
) { 
  this.platform.ready().then(() => {
    this.sqlite.create({
      name: this.database_name,
      location: 'default'
    })
    .then((db: SQLiteObject) => {
        this.storage = db;
        this.getFakeData();
    });
  });
}

dbState() {
  return this.isDbReady.asObservable();
}

fetchSongs(): Observable<any[]> {
  return this.datasList.asObservable();
}

getFakeData() {
  this.httpClient.get(
    'assets/dump.sql', 
    {responseType: 'text'}
  ).subscribe(data => {
    this.sqlPorter.importSqlToDb(this.storage, data)
      .then(_ => {
        // this.getSongs();
        this.isDbReady.next(true);
      })
      .catch(error => console.error(error));
  });
}

// getSongs(){
//   return this.storage.executeSql('SELECT * FROM songtable', []).then(res => {
//     let items: any[] = [];
//     if (res.rows.length > 0) {
//       for (var i = 0; i < res.rows.length; i++) { 
//         items.push({ 
//           id: res.rows.item(i).id,
//           artist_name: res.rows.item(i).artist_name,  
//           song_name: res.rows.item(i).song_name
//          });
//       }
//     }
//     this.datasList.next(items);
//   });
// }

// Add
addSong(artist_name, song_name) {
  let data = [artist_name, song_name];
  return this.storage.executeSql('INSERT INTO songtable (artist_name, song_name) VALUES (?, ?)', data)
  .then(res => {
    // this.getSongs();
  });
}
addCustomer(customerType, customerName, customerDOB, customerAddress, customerArea, customerCity, customerPin, customerMobile, customerMail, customerPaymentType,customerDay){
  let data = [customerType, customerName, customerDOB, customerAddress, customerArea, customerCity, customerPin, customerMobile, customerMail, customerPaymentType,customerDay];
  return this.storage.executeSql('INSERT INTO fwp_customer (fwp_cus_code, fwp_cus_name, fwp_cus_dtofbirth, fwp_cus_address, fwp_cus_area, fwp_cus_city, fwp_cus_pincode, fwp_cus_mobileno, fwp_cus_mailid, fwp_cus_paymenttype, fwp_cus_day) VALUES (?,?,?,?,?,?,?,?,?,?,?)', data)
  .then(res => {
    // this.getSongs();
  });
}
// Get single object
getSong(id): Promise<any> {
  return this.storage.executeSql('SELECT * FROM songtable WHERE id = ?', [id]).then(res => { 
    return {
      id: res.rows.item(0).id,
      artist_name: res.rows.item(0).artist_name,  
      song_name: res.rows.item(0).song_name
    }
  });
}

// Update
updateSong(id, song: any) {
  let data = [song.artist_name, song.song_name];
  return this.storage.executeSql(`UPDATE songtable SET artist_name = ?, song_name = ? WHERE id = ${id}`, data)
  .then(data => {
    // this.getSongs();
  })
}

// Delete
deleteSong(id) {
  return this.storage.executeSql('DELETE FROM songtable WHERE id = ?', [id])
  .then(_ => {
    // this.getSongs();
  });
}

}

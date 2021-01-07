import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private storage: SQLiteObject;
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

constructor(
  private http: HttpClient,
  private sqlPorter: SQLitePorter,
  private sqlite: SQLite, 
) { 
  this.getFakeData();
}

getLogin(username: string, password: string): Observable<any> {
  let loginUrl: 'http://fieldworkspos.azurewebsites.net/master/employee/valid';
  const data = {'empname': username, 'emppassword': password};
  return this.http.post('http://fieldworkspos.azurewebsites.net/master/employee/valid', data);
}

getFakeData() {
  this.http.get(
    'assets/Masterownload_tables.sql', 
    {responseType: 'text'}
  ).subscribe(data => {
    this.sqlPorter.importSqlToDb(this.storage, data)
      .then(_ => {
        alert("imported")
        this.isDbReady.next(true);
      })
      .catch(error => console.error(error));
  });
}
}

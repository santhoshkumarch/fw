import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router
  ) {
    
  }

  ngOnInit() {
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


}

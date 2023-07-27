import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/service';
import { OrderService } from 'src/app/service/order-service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  isLoggedIn = false;
  currentUser: any;
  public roles: string[] = [];
  showUserBoard = false;
  showAdminBoard = false;
  username?: string;
  cartList:any = [];
  items= 0;
  total = 0;

  order:any = {
    "status":"",
    "paymentStatus":""
  };

  constructor( private tokenStorageService: TokenStorageService, private service:Service, private router: Router, private route:ActivatedRoute, private orderService: OrderService) { }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      console.log(this.roles[0]);
      this.username = user.username;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
    }
    this.currentUser = this.tokenStorageService.getUser().username;
    console.log(this.currentUser);

    this.orderService.getCartItems(this.currentUser).subscribe((data)=>{
      this.cartList = data;
      console.log(data);
      console.log(this.cartList);
      this.totalItems(this.cartList);
      this.totalAmount(this.cartList);
    })
  }

  totalItems(item: any){
    for(let i = 0; i < item.length; i++){
      this.items = this.items + item[i].quantity;
      console.log(this.items);
    }
  }

  totalAmount(item: any){
    for(let i = 0; i < item.length; i++){
      this.total = this.total + item[i].total;
      console.log(this.total);
    }
  }

  addToOrder(){
    this.order = {
      status:"pending",
      paymentStatus:"not-paid"
    };

    this.orderService.postOrder(this.currentUser,this.order).subscribe((data)=>{
      console.log(data);
      this.deleteCartOnceCheckout(this.currentUser);
    })

  }

  deleteCartOnceCheckout(username:string){
    this.orderService.deleteOrderPerUser(username).subscribe((data)=>{
      console.log("deleted");
    })
  }

}

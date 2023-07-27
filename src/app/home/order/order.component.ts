import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/service';
import { OrderService } from 'src/app/service/order-service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  isLoggedIn = false;
  currentUser: any;
  public roles: string[] = [];
  showUserBoard = false;
  showAdminBoard = false;
  username?: string;
  orderList:any = [];
  bookObject:any = [];
  total:any;
  payId:any;
  user:any;

  constructor(private dialog:MatDialog, private tokenStorageService: TokenStorageService, private service:Service, private router: Router, private route:ActivatedRoute, private orderService: OrderService) { }
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

    this.orderService.getOrderPerUsername(this.currentUser).subscribe((data)=>{
      this.orderList = data;
      console.log(this.orderList);
      console.log(data);
  })
}

payOrderById(payId: String,user:string, total:any){
  this.payId = payId;
    this.total = total;
    this.user = user;
    
  }

  payNow(){

    let form = {
      "status":"paid"
    };

    let form1 = {
      "paymentStatus":"paid"
    };
  
    this.orderService.createPayment(this.payId, this.user,form).subscribe((data)=>{
      this.orderService.updateOrderPerPay(this.payId,form1).subscribe((result)=>{
        console.log(result);
      })
      console.log(data);
      this.showSuccess();
    }, 
    (err)=>{
      console.log(err);

    })
  }

  showButton(paymentStatus:any){
    if(paymentStatus === "paid"){
      return false;
    }
    return true;
  }

  showSuccess(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Paid successfully'
    })
  }


deleteOrderById(orderId: string){
  this.orderService.deleteOrderById(orderId).subscribe((data)=>{
    console.log("deleted");
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Deleted successfully'
    })
  })
}



}

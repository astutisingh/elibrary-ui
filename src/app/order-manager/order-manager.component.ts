import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';
import { Service } from '../service';
import { OrderService } from '../service/order-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.css']
})
export class OrderManagerComponent {

  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  showUserBoard = false;
  showAdminBoard = false;
  username?: string;
  currentUser: any;
  orderList:any = [];
  getOrderDetails:any;
  id:any;

  orderToUpdate:any = {
    "deliveryDate":'',
    "status":''
  };


  constructor(public dialog: MatDialog,private auth: AuthService,private route:Router,private tokenStorage: TokenStorageService, private service:OrderService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      const user = this.tokenStorage.getUser();
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.username = user.username;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
    }

    this.service.getAllOrders().subscribe((data) => {
      this.orderList = data;
      console.log(data);
      console.log(this.orderList);
      for(let i = 0; i < this.orderList.length; i++){
        console.log(this.orderList[i].orderId);
        this.id = this.orderList[i].orderId;
        this.getByOrderId(this.id);
      }
    })
  }

  getByOrderId(orderId: string){
    this.service.getByOrderId(orderId).subscribe((data) => {
      console.log(data);
      this.getOrderDetails = data;
      this.orderToUpdate = {
        deliveryDate: this.getOrderDetails.deliveryDate,
        status: this.getOrderDetails.status
      }
    })
  }

  onEntry(id:string,value:any){
    this.orderToUpdate = {
      deliveryDate:value,
      status:"confirmed"
    }
    this.update(id);
  }

  update(id:string){
    this.service.updateOrder(id,this.orderToUpdate).subscribe((data) =>{
      console.log(data);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Updated successfully'
      }).then(() => {
        window.location.reload();
      })
    })

  }








}

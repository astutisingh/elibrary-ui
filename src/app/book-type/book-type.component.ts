import { Component } from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service';
import { Service } from '../service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { OrderService } from '../service/order-service';

@Component({
  selector: 'app-book-type',
  templateUrl: './book-type.component.html',
  styleUrls: ['./book-type.component.css']
})
export class BookTypeComponent {

  
  isLoggedIn = false;
  currentUser: any;
  public roles: string[] = [];
  showUserBoard = false;
  showAdminBoard = false;
  username?: string;
  viewAll:any = [];
  array: any;
booktype:any;
content: any;
  constructor( private tokenStorageService: TokenStorageService, private service:Service, private router: Router, private route:ActivatedRoute, private orderService: OrderService) { }

rental:any = {
  "username":"",
  "startDate": "",
  "endDate": "",
  "status":''
}

cart:any ={
  "quantity":1
} 


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

    let bookType = this.route.snapshot.paramMap.get('bookType');
    this.booktype = bookType;

    this.service.getByBookType(this.booktype).subscribe((response)=>{
      this.content = response;
      console.log(response);
    })
  }

  addToRent(bookId:any){
    let startDate:Date = new Date();
    let endDate:Date = new Date();
    let reStartDate:string = startDate.toLocaleString();
    let reEndDate:string = endDate.toLocaleString();
    this.rental = {
      username:this.currentUser,
      startDate: reStartDate,
      endDate: reEndDate,
      status: "processing"
    }
    this.service.postRent(bookId, this.rental).subscribe((data) =>{
      console.log(data);
    })
  }

  confirmSave(bookId:any){
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.addToRent(bookId);
        Swal.fire('Saved!', '', 'success')
      //   .then(() => {
      //     window.location.reload();
      // })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
      
    })
    window.location.reload;
  }


  addToCart(id: string){

    this.orderService.createCartItems(this.currentUser, id, this.cart).subscribe((data)=>{
      console.log(data);
    })
  }

}

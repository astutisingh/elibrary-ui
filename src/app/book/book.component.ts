import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';
import { Book } from '../model/book';
import { RentService } from '../service/rent-service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {

  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  showUserBoard = false;
  showAdminBoard = false;
  username?: string;
  currentUser: any;

  products:Book={
    bookName: '',
    bookType: '',
    rating: 0,
    stock: 0,
    price: 0
  };


  constructor(private auth: AuthService, private router: Router,private tokenStorage: TokenStorageService, private bookService: RentService, public toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      const user = this.tokenStorage.getUser();
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.username = user.username;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
    }
  }

  createBook(form:NgForm){

this.products = {
  bookName:form.value.bookName,
  bookType:form.value.bookType,
  rating:0,
  stock:form.value.stock,
  price:form.value.price
};

this.bookService.createBook(this.products).subscribe((data) => {
  console.log(data);
  this.showSuccess();
})



  }

  showSuccess(){
    this.toastr.success('everything is broken', 'Major Error', {
   timeOut: 3000,
   
 });
   }

}

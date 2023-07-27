import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Service } from '../service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateBooksDialogueComponent } from './update-books-dialogue/update-books-dialogue.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {

  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  showUserBoard = false;
  showAdminBoard = false;
  username?: string;
  currentUser: any;
  bookList:any = [];

  displayedColumns: string[] = ['Book Name', 'Type', 'Stocks', 'Price', 'Ratings', 'Action'];
  menuIds: any;
  bookIds: any;

  constructor(public dialog: MatDialog,private auth: AuthService, private router: Router,private tokenStorage: TokenStorageService, public toastr: ToastrService, private service:Service) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      const user = this.tokenStorage.getUser();
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.username = user.username;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
    }

    
    
this.service.getViewAll().subscribe((data)=>{
  console.log(data);
  this.bookList = data;
})

  }

  
  

  edit(booksId:any){
    this.bookIds = booksId;
    console.log(this.bookIds);
    this.openDialog();
  }


  openDialog() {
    const dialogRef = this.dialog.open(UpdateBooksDialogueComponent,{
      panelClass:'updateBooksDialog',
      data:this.bookIds
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  };

  deleteBookById(id:string){
    this.service['deleteBookByID'](id).subscribe(() => {
      console.log("Deleted Successfully");
    })
  }

  delete(id:string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteBookById(id);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
       
      }
      window.location.reload();
    })
  };





}
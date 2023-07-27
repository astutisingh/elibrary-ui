import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Service } from 'src/app/service';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { BookDetailsComponent } from '../book-details/book-details.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rental-history',
  templateUrl: './rental-history.component.html',
  styleUrls: ['./rental-history.component.css']
})
export class RentalHistoryComponent {

  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  showUserBoard = false;
  showAdminBoard = false;
  username?: string;
  currentUser: any;
  list:any = [];
  displayedColumns: string[] = ['User Name', 'Start Date', 'End Date', 'Status','Action'];
  rating: any;
  rentalId:any;
  form:any = {
    "bookRated":''
  }

  constructor(public dialog: MatDialog,private auth: AuthService,private route:Router,private tokenStorage: TokenStorageService, private service:Service) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      const user = this.tokenStorage.getUser();
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.username = user.username;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
    }
    this.currentUser = this.tokenStorage.getUser().username;

    this.service.viewByUsername(this.currentUser).subscribe((response)=>{
      this.list = response;
      console.log(this.list);
    })
  }


  openDialog(books:any[]) {
    const dialogRef = this.dialog.open(BookDetailsComponent,{
      panelClass:'openBooksDialog',
      data:books
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteRentalById(id:string){
    this.service.deleteRentalByID(id).subscribe((result) => {
      console.log("Deleted Successfully");
    })
  }

  confirmDelete(id:string){
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
        this.deleteRentalById(id);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
       
      }
      window.location.reload();
    })
  }

  openDialogForRating(Id:any){
    this.rentalId = Id;
  }

  onSubmit(f:any){
    
    const {bookRated} = this.form;
    console.log(this.form);
    let bookStatus = {
      "bookRated":"yes"
    }

    this.service.uploadRating(this.rentalId,this.form.rating,bookStatus).subscribe((data) =>{
      console.log("Rating Added By the User!.");
    })




  }



}

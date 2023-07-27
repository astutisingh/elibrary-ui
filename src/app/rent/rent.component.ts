import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';
import { Service } from '../service';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsComponent } from './book-details/book-details.component';
import { UpdateRentalComponent } from './update-rental/update-rental.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent {

  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  showUserBoard = false;
  showAdminBoard = false;
  username?: string;
  currentUser: any;
  rentalList:any = [];

  displayedColumns: string[] = ['User Name', 'Start Date', 'End Date', 'Status','Action'];
  rentIds: any;

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

    this.service.getViewAllRentals().subscribe((data)=>{
      this.rentalList = data;
      console.log(this.rentalList);
    })

  }


  edit(rentId:any){
    this.rentIds = rentId;
    console.log(this.rentIds);
    this. openDialogForUpdate();
  }

  openDialogForUpdate() {
    const dialogRef = this.dialog.open(UpdateRentalComponent,{
      panelClass:'updateRentalDialog',
      data:this.rentIds
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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




}

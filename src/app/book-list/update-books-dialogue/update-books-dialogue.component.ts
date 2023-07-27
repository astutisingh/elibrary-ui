import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from 'src/app/model/book';
import { Service } from 'src/app/service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-books-dialogue',
  templateUrl: './update-books-dialogue.component.html',
  styleUrls: ['./update-books-dialogue.component.css']
})
export class UpdateBooksDialogueComponent {

  bookId:any;
  getBookItems:any;

  bookToUpdate:Book = {
    bookName: '',
    bookType: '',
    rating: 0,
    stock: 0,
    price: 0
  }


    // receive data from parent using 'MAT_DIALOG_DATA'
    constructor(@Inject(MAT_DIALOG_DATA) public data: string, private service:Service,
    private dialogRef: MatDialogRef<UpdateBooksDialogueComponent>) {
      console.log(data);
      this.bookId = data;
      this.getBookByBookId(this.bookId);
     }

     getBookByBookId(bookId: string){
      this.service.getViewByBookId(bookId).subscribe((data)=>{
        console.log(data);
        this.getBookItems = data;
        this.bookToUpdate = {
          bookName:this.getBookItems.bookName,
          bookType:this.getBookItems.bookType,
          rating:this.getBookItems.rating,
          stock:this.getBookItems.stock,
          price:this.getBookItems.price
        }
      })
     }

     confirmSave(updatedForm:any){
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.updatedMenu(updatedForm);
          Swal.fire('Saved!', '', 'success')
          .then(() => {
            window.location.reload();
        })
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
        
      })
      window.location.reload;
    }
  updatedMenu(updatedForm: any) {
    this.bookToUpdate = {
      bookName:updatedForm.value.bookName,
      bookType:updatedForm.value.bookType,
      rating:updatedForm.value.rating,
      stock:updatedForm.value.stock,
      price:updatedForm.value.price
    };

    this.service.updateBookByBookId(this.getBookItems.bookId, this.bookToUpdate).subscribe((result)=>{
      console.log(result);
    })
    
  }




}

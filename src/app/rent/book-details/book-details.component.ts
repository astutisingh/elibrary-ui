import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Service } from 'src/app/service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {

  booksDetails:any = [];

  displayedColumns: string[] = ['BookId', 'Book Name', 'Book Type', 'Price','Rating','Stock'];
  mapExtract: any;
  f:any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private service: Service){
    console.log(data);
    this.booksDetails.push(data);
  }

  ngOnInit() {

    
  for(let i = 0; i < this.booksDetails.length; i++){
    console.log(this.booksDetails[i].books);
    this.mapExtract = this.booksDetails[i].books;
    this.f.push(this.mapExtract);
  }

 console.log(this.f);
//   console.log(this.mapExtract);
    console.log(this.booksDetails);
console.log(this.data);

  }

}

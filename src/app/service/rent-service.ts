import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Book } from "../model/book";

@Injectable({
    providedIn: 'root'
  })
export class RentService {

    constructor(private http:HttpClient) {
       
    }

    BOOK_API = "http://localhost:8081/book";

    createBook(book:Book){
        return this.http.post(this.BOOK_API+'/saveBook',book);
    }
}

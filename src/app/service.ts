import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class Service {
    [x: string]: any;
    

    constructor(private http:HttpClient) {
       
    }

    BOOK_API = "http://localhost:8081/book/"
    RENTAL_API = "http://localhost:7000/rental/"
    

    getByBookType(bookType: string){
     
        return this.http.get(this.BOOK_API+'viewByType/'+bookType);
    }

    getViewAll(){
        return this.http.get(this.BOOK_API+'viewAll');
    }

    postRent(bookId: string, obj:any){
        return this.http.post(this.RENTAL_API+'addRental/'+bookId, obj);
    }

    getViewByBookId(bookId: string){
        return this.http.get(this.BOOK_API+'viewBookByBookId/'+bookId);
    }

    updateBookByBookId(bookId: string, obj:any){
        return this.http.put(this.BOOK_API+'update/'+bookId, obj);
    }

    getViewAllRentals(){
        return this.http.get(this.RENTAL_API+'viewAll');
    }

    updateRental(rentalId: string, obj:any){
        return this.http.put(this.RENTAL_API+'update/'+rentalId, obj);
    }

    viewByRentalId(rentalId: string){
        return this.http.get(this.RENTAL_API+'viewRental/'+rentalId);
    }

    viewByUsername(username: string){
        return this.http.get(this.RENTAL_API+'viewbyUsername/'+username);
    }

    deleteRentalByID(rentalId:string){
        return this.http.delete(this.RENTAL_API+'delete/'+rentalId);
    }

    uploadRating(rentalId:string,rating:any, obj:any){
        return this.http.post(this.RENTAL_API+'rating/'+rentalId+'/'+rating,obj);
    }

    deleteBookByID(bookId:string){
        return this.http.delete(this.BOOK_API+'delete/'+bookId);
    }



}

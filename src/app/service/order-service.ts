import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class OrderService {

    constructor(private http:HttpClient) {
       
    }

    CART_API = 'http://localhost:7000/cart/';
    ORDER_API = "http://localhost:7000/order/";
    PAYMENT_API = 'http://localhost:8089/payment/';

    createCartItems(username:string, bookId:string, cart:any){
        return this.http.post(this.CART_API+'/item/'+username+'/'+bookId,cart);
    }

    getCartItems(username:string){
        return this.http.get(this.CART_API+'/cartItems/'+username);
    }

    postOrder(username:string, order:any){
        return this.http.post(this.ORDER_API+'addOrder/'+username, order);
    }

    getOrderPerUsername(username:string){
        return this.http.get(this.ORDER_API+'orderPerUser/'+username);
    }

    deleteOrderPerUser(username:string){
        return this.http.delete(this.ORDER_API+'delete/'+username);
    }

    getAllOrders(){
        return this.http.get(this.ORDER_API+'viewAll');
    }

    deleteOrderById(id:string){
        return this.http.delete(this.ORDER_API+'delete/'+id);
    }

    updateOrder(orderId:string, obj:any){
        return this.http.put(this.ORDER_API+'updateOrder/'+orderId, obj);
    }

    updateOrderPerPay(orderId:string, obj:any){
        return this.http.put(this.ORDER_API+'updateOrderPerPay/'+orderId, obj);
    }

    getByOrderId(orderId:string){
        return this.http.get(this.ORDER_API+'order/'+orderId);
    }

    createPayment(orderId:string, username:string, obj:any){
        return this.http.post(this.PAYMENT_API+'create/'+orderId+'/'+username,obj);
    }

    getPaymentStatus(orderId:string){
        return this.http.get(this.PAYMENT_API+'getStatus/'+orderId);
    }




    
}

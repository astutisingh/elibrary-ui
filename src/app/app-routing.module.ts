import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { RentComponent } from './rent/rent.component';
import { HomeComponent } from './home/home.component';
import { BookTypeComponent } from './book-type/book-type.component';
import { BookComponent } from './book/book.component';
import { BookListComponent } from './book-list/book-list.component';
import { RentalHistoryComponent } from './rent/rental-history/rental-history.component';
import { CartComponent } from './home/cart/cart.component';
import { OrderComponent } from './home/order/order.component';
import { OrderManagerComponent } from './order-manager/order-manager.component';



const routes: Routes = [
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'rent-manager', component: RentComponent },
  { path: 'home', component: HomeComponent},
  { path: 'book-type/:bookType', component: BookTypeComponent},
  { path: 'create-books', component:BookComponent},
  { path: 'book-list', component:BookListComponent},
  { path: 'rental-history', component:RentalHistoryComponent},
  { path: 'cart', component:CartComponent},
  {path: 'order', component:OrderComponent},
  {path: 'order-manager', component:OrderManagerComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

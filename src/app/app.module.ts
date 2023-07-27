import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { RentComponent } from './rent/rent.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { BookTypeComponent } from './book-type/book-type.component';
import {ToastrModule} from 'ngx-toastr';
import { RegisterComponent } from './register/register.component';
import { BookListComponent } from './book-list/book-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatTableModule} from '@angular/material/table';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { UpdateBooksDialogueComponent } from './book-list/update-books-dialogue/update-books-dialogue.component';
import { BookDetailsComponent } from './rent/book-details/book-details.component';
import { UpdateRentalComponent } from './rent/update-rental/update-rental.component';
import { RentalHistoryComponent } from './rent/rental-history/rental-history.component';
import { CartComponent } from './home/cart/cart.component';
import { OrderComponent } from './home/order/order.component';
import { OrderManagerComponent } from './order-manager/order-manager.component';


@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    RentComponent,
    LoginComponent,
    AdminDashboardComponent,
    NavbarComponent,
    RentComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    BookTypeComponent,
    RegisterComponent,
    BookListComponent,
    UpdateBooksDialogueComponent,
    BookDetailsComponent,
    UpdateRentalComponent,
    RentalHistoryComponent,
    CartComponent,
    OrderComponent,
    OrderManagerComponent,

   
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

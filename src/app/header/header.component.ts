import { Component } from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service';
import { Service } from '../service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isLoggedIn = false;
  currentUser: any;
  public roles: string[] = [];
  showUserBoard = false;
  showAdminBoard = false;
  username?: string;
  viewAll:any = [];
  array: any;

  constructor( private tokenStorageService: TokenStorageService, private service:Service, private router: Router) { }


  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      console.log(this.roles[0]);
      this.username = user.username;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
    }
    this.currentUser = this.tokenStorageService.getUser().username;

    this.service.getViewAll().subscribe((data) => {
      console.log(data);
      this.viewAll = data;
      this.array = this.getUniqueList(this.viewAll,'bookType');
      console.log(this.viewAll)
    })
  }

  getUniqueList(arr:any, key:any) {
    return [...new Map(arr.map((item:any) => [item[key], item])).values()]
  }

  gocat(a:any){
    this.router.navigate(['/book-type',a.bookType])
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }


  


}

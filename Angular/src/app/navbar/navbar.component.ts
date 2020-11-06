import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // tslint:disable-next-line: ban-types
  // tslint:disable-next-line: ban-types
// tslint:disable-next-line: typedef
Logout()
{
  this.flashMessage.show('Successfull logged out', {cssClass: 'alert-success', timeout: 3000});
  this.router.navigate(['/login']);
  this.authService.logout();
}

  constructor(
    private flashMessage: FlashMessagesService,
    public authService: AuthService,
    private router: Router ) { }

  ngOnInit(): void {
         }

    }

// tslint:disable-next-line: typedef



import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // tslint:disable-next-line: ban-types
  username: String;
  // tslint:disable-next-line: ban-types
  password: String;
  constructor(private router: Router, private authService: AuthService, private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
  }
// tslint:disable-next-line: typedef
login()
{
   const user = {
     username: this.username,
     password: this.password
   };
   this.authService.authenticateUser(user).subscribe((data: any) => {
    if (data.success){
      this.authService.storeUserData(data.token, data.user);
      this.flashMessage.show('Successfully logged in', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/profile']);
    } else {
      this.flashMessage.show('Invalid username/password', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/login']);
    }
});
}
}

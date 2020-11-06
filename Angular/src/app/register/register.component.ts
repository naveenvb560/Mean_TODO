import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../services/validate.service';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

constructor(private validateService: ValidateService,
            private flashMessage: FlashMessagesService,
            private authService: AuthService,
            private router: Router ) { }

  // tslint:disable-next-line: member-ordering
  // tslint:disable-next-line: ban-types
  username: String;

  // tslint:disable-next-line: ban-types
  password: String;

  // tslint:disable-next-line: typedef
  onRegisterSubmit(){
    const user = {
      username: this.username,
      password: this.password
    };
    // // Required Fields
    if (!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    // register user

    this.authService.registerUser(user).subscribe((data: any) => {
      if (data.success){
        this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });

}

  // tslint:disable-next-line: typedef
  ngOnInit() {
  }
}

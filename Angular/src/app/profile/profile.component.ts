import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // tslint:disable-next-line: ban-types
  user: Object;
  constructor(private authService: AuthService, private router: Router) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
     this.authService.getProfile().subscribe((data) => {

       this.user = data.user;
    },
     err => {
       console.log(err);
       return false;
     });
     // tslint:disable-next-line: deprecation
     // tslint:disable-next-line: deprecation

}
}

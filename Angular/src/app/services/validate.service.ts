import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  // tslint:disable-next-line: typedef
  validateRegister(user){
    // tslint:disable-next-line: triple-equals
    if ( user.username == undefined || user.password == undefined){
      return false;
    } else {
      return true;
    }
  }

}

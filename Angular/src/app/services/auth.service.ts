import { JwtHelperService } from '@auth0/angular-jwt';
import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';
import { Header } from '@nestjs/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line: new-parens
  jwtHelp = new JwtHelperService;
  authToken: any;
  user: any;
  constructor(private http: HttpClient) {}
  // tslint:disable-next-line: typedef
  registerUser(user) {
    // tslint:disable-next-line: prefer-const
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // tslint:disable-next-line: object-literal-shorthand
    return this.http.post('http://localhost:3000/register', user, {
      headers
    });
  }
  // tslint:disable-next-line: typedef
  authenticateUser(user) {
    // tslint:disable-next-line: prefer-const
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // tslint:disable-next-line: object-literal-shorthand
    return this.http.post('http://localhost:3000/authenticate', user, {
      headers
    });
  }
  // tslint:disable-next-line: typedef
  getProfile(): Observable < any > {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken
    });
    // tslint:disable-next-line: object-literal-shorthand
    return this.http.get('http://localhost:3000/profile', {
      headers
    });

  }
  // tslint:disable-next-line: typedef
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  // tslint:disable-next-line: typedef
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  // tslint:disable-next-line: typedef
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  // tslint:disable-next-line: typedef
    loggedIn() {
      // tslint:disable-next-line: triple-equals
   return !(this.jwtHelp.isTokenExpired(localStorage.getItem('id_token')));

}
// tslint:disable-next-line: typedef
getTodo(){
  this.loadToken();
  // tslint:disable-next-line: prefer-const
  const header = new HttpHeaders({
    'Content-Type': 'application/json', Authorization: this.authToken
  });
  // tslint:disable-next-line: object-literal-shorthand
  // tslint:disable-next-line: whitespace
  return this.http.get('http://localhost:3000/getTodo', { headers: header});
}
// tslint:disable-next-line: typedef tslint:disable-next-line: variable-name
Rem_Todo(Tod_id){
  this.loadToken();
  // tslint:disable-next-line: variable-name
  const Todo_id: any = {
    Todo_id : Tod_id
  };
  // tslint:disable-next-line: prefer-const
  const header = new HttpHeaders({
    'Content-Type': 'application/json', Authorization: this.authToken
  });
  // tslint:disable-next-line: object-literal-shorthand
  // tslint:disable-next-line: whitespace
  return this.http.post('http://localhost:3000/RemoveTodo', Todo_id , { headers: header}).subscribe((data) => {
    console.log('data' + data);
     },
      err => {

        console.log(err);
        return false;
      });
    }
    // tslint:disable-next-line: typedef tslint:disable-next-line: variable-name tslint:disable-next-line: ban-types
    Edit(id: any , e_todo: String)
    {
      const res: any = {
        Id : id,
        Todo : e_todo
      };
      this.loadToken();
  // tslint:disable-next-line: prefer-const
      const header = new HttpHeaders({
    'Content-Type': 'application/json', Authorization: this.authToken
  });
  // tslint:disable-next-line: object-literal-shorthand
  // tslint:disable-next-line: whitespace
      return this.http.post('http://localhost:3000/EditTodo', res, { headers: header}).subscribe((data) => {
console.log('data' + data);
 },
  err => {

    console.log(err);
    return false;
  });
}
// tslint:disable-next-line: typedef
AddTodo(Todo){
  this.loadToken();
  // tslint:disable-next-line: prefer-const
  let todo = {
    todo: Todo
  };
  const header = new HttpHeaders({
    'Content-Type': 'application/json', Authorization: this.authToken
  });
  // tslint:disable-next-line: object-literal-shorthand
  // tslint:disable-next-line: whitespace
  return this.http.post('http://localhost:3000/AddTodo', todo, { headers: header}).subscribe((data) => {
console.log('data' + data);
 },
  err => {

    console.log(err);
    return false;
  });
}
}

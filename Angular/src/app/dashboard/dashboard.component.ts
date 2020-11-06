import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // tslint:disable-next-line: ban-types
  Todo: String;
  todo: any;
  // tslint:disable-next-line: variable-name
  Edit_value: any;
  constructor(private router: Router , private authService: AuthService) {

  }

  ngOnInit(): void {
    this.gettodo();
  }

  // tslint:disable-next-line: typedef
  gettodo()
  {
    this.authService.getTodo().subscribe((data) => {
      this.todo = data;

    });
  }
  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: variable-name tslint:disable-next-line: typedef
  RemoveTodo( toDo_id: any){
    this.authService.Rem_Todo(toDo_id);
    // tslint:disable-next-line: no-unused-expression  tslint:disable-next-line: no-string-literal
    this.router.navigate['/dashboard'];


  }
  // tslint:disable-next-line: typedef
  enable(item)
{
  document.getElementById('val' + item).removeAttribute('disabled');
}
  // tslint:disable-next-line: typedef
  edit(id, i){
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    this.Edit_value = (<HTMLInputElement> document.getElementById('val' + i)).value;
    document.getElementById('val' + i).setAttribute('disabled', 'true');
    this.authService.Edit(id, this.Edit_value);
    // tslint:disable-next-line: no-unused-expression  tslint:disable-next-line: no-string-literal
    this.router.navigate['/dashboard'];
  }
  // tslint:disable-next-line: typedef
  Add_Todo(){
      // tslint:disable-next-line: deprecation
      this.authService.AddTodo(this.Todo);
      // tslint:disable-next-line: no-unused-expression  tslint:disable-next-line: no-string-literal
      this.router.navigate['/dashboard'];

}
  }



import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  
  [x: string]: any;




  model: any = {
    Email: '',
  Password: ''
  };

  constructor(private http: HttpClient, private router: Router) { }

  SignInUser() {
  //  alert("1");
    console.log(this.model);
   // alert("model!!!");
  
    this.http.post('https://localhost:44352/api/AccountManager/signin', this.model).subscribe(
      (response: any) => {
        
        const token = response.tokensessionlogged;
        const idUser=response.iduser;
        console.log("id user!!"+idUser);
       // alert("id user !!!"+idUser)
        const username = response.userlogged;
        const firstname = response.firstname;
         const lastname=response.lastname;
        // const phonenumber=response.phonenumber;
        // const firstname=response.firstname;
       const email=response.email;
     //  alert("Tok !!"+token);
        console.log("call api login");

        console.warn("Token is  : " + token);
        console.warn("User is  : " +username);
        // console.warn("LastName is  : " +lastname);
         console.warn("FirstName is  : " +firstname);
        // console.warn("email is  : " +email);
        localStorage.setItem('ObjectIdUser', idUser);
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
      //  alert("setItem");
        Swal.fire({
          text: 'User logged successfully',
          icon: 'success'
        }).then((result) => {
          this.router.navigate(['/space-books'], { queryParams: { username: username,firstname:firstname,lastname:lastname,email: email} });
        });
        
      },
      (error) => {
        console.error(error);
        Swal.fire({
          text: 'Login Failed',
          icon: 'error'
        }).then((result) => {
    
        });
      }
    );
    
  }
  
}

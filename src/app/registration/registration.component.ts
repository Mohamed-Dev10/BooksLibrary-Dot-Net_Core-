import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import Swal from 'sweetalert2';

export interface RegisterViewModel {
  email: string;
  password: string;
  confirmpassword:string;
  username: string;
  firstname: string;
  lastname: string;
  // PhoneNumber:string;
}



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {
  [x: string]: any;



  model: any = {
    email: '',
  password: '',
  confirmpassword: '',
  username: '',
  firstname: '',
  lastname: '',
  // PhoneNumber:''
  };
  



   // private apiUrl = 'https://localhost:44330/api/UserApi/register';

  constructor(private http: HttpClient,private router: Router) { }

  
    RegisterUser() {
    
       //   console.log(this.model);
         
            this.http.post('https://localhost:44352/api/AccountManager/signup', this.model).subscribe(
              (data) => {
                Swal.fire({
                  text: 'user created successfully',
                  icon: 'success' 
                }).then((result) => {
                  this.router.navigate(['/login']);
                })
               
                
              },
              (error) => {
                console.log("1");
                console.error(error);
                console.log("before if");
            
                if (typeof error.error.errors === 'object' && Object.keys(error.error.errors).length > 0) {
                    const errorMessages = []; // Initialize an empty array for error messages
                    for (const fieldName of Object.keys(error.error.errors)) {
                        const fieldErrors = error.error.errors[fieldName];
                        for (const message of fieldErrors) {
                            errorMessages.push(`* ${message}`); // Push each error message with a bullet prefix
                        }
                    }
                    Swal.fire({
                        html: `Failed Operation !       <ul>${errorMessages.map((message) => `<li>${message}</li>`).join('')}</ul>`,
                        icon: 'error'
                    }).then((result) => {
                        // Handle the Swal result as needed
                    });
                } else if (typeof error.error.errors === 'string') {
                    // Handle the case where there's a single error message
                    const errorMessage = error.error.errors;
                    console.log(errorMessage);
                } else {
                    // Handle other cases
                    console.log("Unhandled error format");
                }
            
                console.log("after Container");
            }
            
            );
    }
    
}

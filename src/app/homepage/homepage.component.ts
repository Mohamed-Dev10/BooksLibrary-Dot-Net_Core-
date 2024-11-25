import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-homepage, app-sign-out',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent {
  username!: string;
  firstname!: string;
  lastname!: string;
  // phonenumber!: string;
  email!: string;
 
 


  constructor(private route: ActivatedRoute, private authService: AuthService,private router: Router) {}


// Inside ngOnInit() or any other relevant method


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
      this.firstname = params['firstname'];
      this.lastname = params['lastname'];
      // this.phonenumber = params['phonenumber'];
      this.email = params['email'];
    });
  }

  signOut(): void {
    this.authService.signOut().subscribe(
      () => {
     //   alert("after call api ")
        localStorage.removeItem('token');
      //  alert("removing token");
        this.router.navigate(['/login']);
      },
      (error) => {
        // Handle error
      }
    );
  }
  
}


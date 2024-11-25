import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-settingsuser',
  templateUrl: './settingsuser.component.html',
  styleUrls: ['./settingsuser.component.css']
})
export class SettingsuserComponent {

  constructor(private route: ActivatedRoute, private authService: AuthService,private router: Router) { }


  openCity(evt: MouseEvent, cityName: string) {
    const tabcontent = document.getElementsByClassName("tabcontent") as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    const tablinks = document.getElementsByClassName("tablinks") as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
    }

    const targetCity = document.getElementById(cityName);
    if (targetCity) {
      targetCity.style.display = "block";
    }

    const currentTarget = evt.currentTarget as HTMLElement;
    if (currentTarget) {
      currentTarget.classList.add("active");
    }
  }


  signOut(): void {
    // alert(":::::")
     this.authService.signOut().subscribe(
       () => {
       // alert("after call api ")
         localStorage.removeItem('token');
       // alert("removing token");
         this.router.navigate(['/login']);
       },
       (error) => {
         // Handle error
       }
     );
   }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AuthService {
    

  constructor(private http: HttpClient) { }

  public getIdUser(): string | null {
    
   //  alert("user id  !"+localStorage.getItem('ObjectIdUser'));
     return localStorage.getItem('ObjectIdUser');
     
    
   }

  public getToken(): string | null {
    
   // alert("toeeeekeenn  !"+localStorage.getItem('token'));
    return localStorage.getItem('token');
    
   
  }
  
  public getUserName(): string | null {
    
   
     return localStorage.getItem('username');
     
    
   }

  public isAuthenticated(): boolean {
    // Get the token
    //alert("isAuthenticated methode !!!!!   ");
    const token = this.getToken();
   // alert("get token !!!!!   "+token);
    // Check if the token is null or expired
    if (token === null || this.isTokenExpired(token)) {
     // alert("token is null or expired !!!!!   ");
      return false; // Token is either null or expired, not authenticated
    }
  
    return true; // Token is valid, authenticated

  }
  
  private isTokenExpired(token: string): boolean {
    // Parse the token to extract the expiration date
    const tokenData = this.parseToken(token);
  
    if (!tokenData || !tokenData.exp) {
      return true; // Token data or expiration time is missing, consider it expired
    }
  
    // Get the current date/time in seconds
    const currentTime = Math.floor(Date.now() / 1000);
  
    // Compare the expiration time with the current time plus one hour (3600 seconds)
    const expirationTime = tokenData.exp;
    return expirationTime < currentTime;
  }
  


  
  private parseToken(token: string): any {
    try {
      // JWT tokens are typically base64-encoded JSON objects
      const tokenPayload = token.split('.')[1];
      return JSON.parse(atob(tokenPayload));
    } catch (error) {
      console.error('Error parsing token:', error);
      return null;
    }
  }
  

  signOut(): Observable<any> {
   // alert("call api")
    return this.http.post<any>('https://localhost:44352/api/AccountManager/signout', null);
  }
  
  
}

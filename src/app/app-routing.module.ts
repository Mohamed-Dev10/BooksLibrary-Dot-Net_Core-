import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { TokenInterceptor } from './service-user-manager.service';
import { AuthService } from './auth-service';
import { SettingsuserComponent } from './settingsuser/settingsuser.component';
import { SpaceBooksComponent } from './space-books/space-books.component';
import { AuthGuard } from './auth.guard';
import { BookinfoComponent } from './bookinfo/bookinfo.component';

const routes: Routes = [

  {

path:'',
redirectTo:'',
pathMatch:'full'

  }
  
  ,{
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'registration',
    component:RegistrationComponent,
    pathMatch:'full'
  },
  {
    path:'homepage',
    component:HomepageComponent,
    pathMatch:'full',
    canActivate:[AuthGuard]
  },
  {
    path:'book',
    component:BookComponent,
    pathMatch:'full',
    canActivate:[AuthGuard]
  },
  {
    path:'settingsuser',
    component:SettingsuserComponent,
    pathMatch:'full',
    canActivate:[AuthGuard]
  },
  {
    path:'space-books',
    component:SpaceBooksComponent,
    canActivate:[AuthGuard]
   
  },
  {
    path:'bookinfo/:id',
    component:BookinfoComponent
  },{
    path:'space-books',
    component:SpaceBooksComponent,
    pathMatch:'full'
   
  },
];




@NgModule({
  imports: [BrowserModule, HttpClientModule,RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthService, // Add AuthService here
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class AppRoutingModule { }

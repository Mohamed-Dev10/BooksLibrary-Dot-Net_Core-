import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BookComponent } from './book/book.component';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { SettingsuserComponent } from './settingsuser/settingsuser.component';
import { SpaceBooksComponent } from './space-books/space-books.component';
import { AuthGuard } from './auth.guard';
import { BookinfoComponent } from './bookinfo/bookinfo.component';
import { FavoriteButtonComponent } from './favorite-button/favorite-button.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

import { SafeUrlPipePipe } from './safe-url-pipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    BookComponent,
    RegistrationComponent,
    SettingsuserComponent,
    SpaceBooksComponent,
    BookinfoComponent,
    FavoriteButtonComponent,
    SafeUrlPipePipe
  ],exports: [
    BookComponent // Add the BookComponent to the exports array as well
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    NgxExtendedPdfViewerModule,
    AppRoutingModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

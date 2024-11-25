import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Book, BookComponent } from '../book/book.component';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth-service';
import Swiper from 'swiper';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-space-books',
  templateUrl: './space-books.component.html',
  styleUrls: ['./space-books.component.css'],
  providers: [BookService], 
})

export class SpaceBooksComponent implements OnInit, AfterViewInit {
  books: Book[] = [];
  dataReady = false; // Flag to track data readiness
  username!: string;
  firstname!: string;
  lastname!: string;
  // phonenumber!: string;
  email!: string;
  cartItemCount: number = 0;



  @ViewChild('swiperContainer') swiperContainer: any;
  constructor(private bookService: BookService,private route: ActivatedRoute, private authService: AuthService,private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
    this.displayAllBooks();
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
      this.firstname = params['firstname'];
      this.lastname = params['lastname'];
      // this.phonenumber = params['phonenumber'];
      this.email = params['email'];
    });
    
   
    
     // Load and display books when the component initializes
  }

  ngAfterViewInit(): void {
    
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
  

  // addItemToCart(): void {
  //   this.http.post('https://localhost:44352/api/BookApi/AddBookToCartShopping', {}).subscribe((response: any) => {
  //     this.cartItemCount = response.cartItemCount;
  //   });
  // }
  

  displayAllBooks(): void {
    this.bookService.getAllBooks().subscribe((response: any) => {
      this.books = response;
      
      this.dataReady = true; // Set the dataReady flag to true when data is ready
      this.updateFileUrls(); // Call the method to update the file URLs
    });
  }

  updateFileUrls(): void {
    if (this.dataReady) { // Only update the file URLs if the data is ready
      this.books.forEach((book) => {
      //  console.log("auth   !!"+book.author.nameAuthor);
        console.log(book);
        const startIndex = book.imgUrl.indexOf('assets');
        book.imgUrl = book.imgUrl.substring(startIndex);
        const startIndex2 = book.imgUrl.indexOf('assets');
        book.imgUrl = book.imgUrl.substring(startIndex2);
      });
    }
  }

  // Method to handle image download
  getFileName(filePath: string): string {
    return filePath.substring(filePath.lastIndexOf('\\') + 1);
  }

  downloadFile(fileUrl: string): void {
    const fileName = this.getFileName(fileUrl);
  // alert("file name!!!!"+fileName)
  // alert("path substr ???"+fileUrl.substring(fileUrl.indexOf('assets')));
  const ConvertedPathFromFileUrl=fileUrl.substring(fileUrl.indexOf('assets'));
    const link = document.createElement('a');
    link.href = ConvertedPathFromFileUrl; // Set the href attribute to the file URL
    link.download = fileName; // Set the download attribute to the file name
  
    // Append the link to the document body
    document.body.appendChild(link);
  
    // Trigger a click event on the link to start the download
    link.click();
  
    // Remove the link from the document body
    document.body.removeChild(link);
  }
  
  
 
  
}

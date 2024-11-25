import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../book/book.component';
import { AuthService } from '../auth-service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommentBook } from '../CommentBook';




export interface CommentResponse {
  commentid: number;
  
  description: string;
  userid: string;
  user: string;
}

export interface RatingUpdateRequest {
  ratingNumber: number;
  userid: string;
  idBook:number;
}

export interface RatingUserBookResponse{
objectid:number;
bookid:number;
userid:string;
ratingNumber:number;
}

@Component({
  selector: 'app-bookinfo',
  templateUrl: './bookinfo.component.html',
  styleUrls: ['./bookinfo.component.css']
})
export class BookinfoComponent implements OnInit{
  private urlApi="https://localhost:44352/api/BookApi";
  commentsWithUsernames: CommentResponse[] = [];

  books: Book[] = [];
  dataReady = false; // Flag to track data readiness
  book: Book | undefined;
  commentsBook: CommentBook[] = [];
  ratingsFromDB: number = 0;
  comment:CommentBook[]=[];
  commentDescriptions: string[] = [];

  ratingsArraByBook: RatingUserBookResponse | undefined;



  username!: string;
  userid!: string;
  description!:string;
 
  commentListWithUsernames: CommentBook[] = [];


  objectId: number | undefined;
  isBookFavorite: boolean = false;
  descriComm:string[]=[];
  isCollapsed = false;
  dynamicPath: string = "/assets/imgPublished/1/CORS.pdf";
  sanitizedUrl: SafeResourceUrl | undefined;
  maxRating = 5; // Define the maximum rating (number of stars)
  selectedRating = 0; // Initialize the selected rating to 0
  ratingsArray: number[] = Array(this.maxRating).fill(0).map((x, i) => i + 1);
constructor(private route: ActivatedRoute,private http: HttpClient,private sanitizer: DomSanitizer, private bookService: BookService,private authService: AuthService,private router: Router) {}

ngOnInit(): void {

  this.route.queryParams.subscribe((params) => {
    const username = this.authService.getUserName(); // Call the function to get the username
    if (username !== null) {
      this.username = username;
    //  alert("username is    " + this.username);
    } else {
      // Handle the case where username is null, perhaps show an error message.
     // alert("Username is null");
    }
  });

  this.route.queryParams.subscribe((params) => {
    const userId = this.authService.getIdUser(); // Call the function to get the username
    if (userId !== null) {
      this.userid = userId;
    //  alert("username is    " + this.username);
    } else {
      // Handle the case where username is null, perhaps show an error message.
     // alert("Username is null");
    }
  });

//get books
  this.route.params.subscribe(params => {
    this.objectId = +params['id'];
   
    // Retrieve the book information by objectId
    if (this.objectId) {
     
      this.bookService.getBookById(this.objectId).subscribe(book => {
        this.book = book;
       
        console.log("nbDown   "+this.book);
       this.book.fileUrl=book.fileUrl.substring(this.book.fileUrl.indexOf('assets'));
       this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(book.fileUrl);
       // this.dynamicPath=book.fileUrl.substring(this.book.fileUrl.indexOf('assets'));
        //console.log("dynamic path !!"+this.dynamicPath);
        //alert("file Url  "+this.fileUrl);
        this.book.imgUrl=book.imgUrl.substring(this.book.imgUrl.indexOf('assets'));
      });
    }
  });

 this.fetchCommentsByBookIdAndUserId();
this.fetchRatingByBookIdUser();

}

fetchCommentsByBookIdAndUserId(): void {
  if (this.objectId) {
    this.bookService.getCommentBookByBookIdAndUserId(this.objectId).subscribe(commentsBook => {
      this.commentsBook = commentsBook;
      
      console.log("Comments Book:");
this.commentsBook.forEach((comment, index) => {
  console.log(`Comment ${index + 1}:`);
  console.log("Comment ID: " + comment.commentid);
  console.log("Description: " + comment.description);
  console.log("User ID: " + comment.userid);
  console.log("Username: " + comment.user);

});

      
    });
  }
}

//Get Rating of Book by id
fetchRatingByBookIdUser(): void {
  if (this.objectId && this.userid) {
    this.bookService.getRatingBookByUser(this.objectId, this.userid).subscribe((ratingUserBookResponse: RatingUserBookResponse) => {
      this.ratingsArraByBook = ratingUserBookResponse;
      console.log("this.ratingNumber  "+this.ratingsArraByBook.ratingNumber);
      console.log("this.ratingsArraByBook: ", this.ratingsArraByBook);
    });
  }
}




getStarsFromDatabase(ratingsFromDB: number): any[] {
  const stars = [];
  for (let i = 0; i < this.maxRating; i++) {
    stars.push({
      selected: i < ratingsFromDB
    });
  }
  return stars;
}






SaveBookToFavo(bookid:number,userid:string):void{


this.bookService.saveBookToFavoritBooksUser(bookid,userid).subscribe(()=>{
  Swal.fire({
    text: 'Book Saved successfully To Favorit Books ',
    icon: 'success'
  }).then(() => {
    
  });

});

}

SaveCommentBook(bookid: number, userid: string): void {
  const description = this.description; // Get the comment text from the variable
//alert("desc  is"+description);
  this.bookService.AddCommentToBook(bookid,userid,description).subscribe(() => {
    this.fetchCommentsByBookIdAndUserId();
     this.EmptyComment();
    Swal.fire({
      text: 'Comment Added successfully',
      icon: 'success',
      showConfirmButton:false,
      timer: 2000,
    }).then(() => {
      // Handle any additional logic after the Swal message
    });
  });
}


SaveRatingBook(bookid: number, userid: string,ratingNumber:number,event: MouseEvent): void {
// const description = this.description; // Get the comment text from the variable
alert("book info function ");
  this.selectedRating = ratingNumber;
  alert(`You clicked on rating ${ratingNumber}`);
  
//alert("desc  is"+description);
  this.bookService.AddRatingToBook(bookid,userid,ratingNumber,event).subscribe(() => {
    // this.fetchCommentsByBookIdAndUserId();
    //  this.EmptyComment();
    alert("call Add Rating");
    Swal.fire({
      text: 'Rating Added successfully',
      icon: 'success',
      showConfirmButton:false,
      timer: 2000,
    }).then(() => {
      // Handle any additional logic after the Swal message
    });
  });
  event.preventDefault();
}

updateRating(bookId: number, userId: string, newRatingNumber: number, event: MouseEvent): void {
  this.bookService.updateRatingBookByUser(bookId, userId, newRatingNumber)
    .subscribe(
      () => {
        alert("Call Update Rating");
        // Perform any necessary actions upon successful rating update
        Swal.fire({
          text: 'Rating Updated successfully',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          // Handle any additional logic after the Swal message
        });
      },
      (error) => {
        // Handle any errors that occur during the rating update
        console.error('An error occurred while updating the rating:', error);
        // You can perform error handling here
      }
    );
  event.preventDefault();
}


getStarIcons(ratingNumber: number): string[] {
  const starIcons = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= ratingNumber) {
      starIcons.push('fa fa-star');
    } else {
      starIcons.push('fa fa-star-o');
    }
  }
  return starIcons;
}


setRating(rating: number): void {
  this.selectedRating = rating;
}

handleRating(rating: number, event: MouseEvent) {
  this.selectedRating = rating;
  alert(`You clicked on rating ${rating}`);
  event.preventDefault();
}
EmptyComment(){

  this.description='';

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

getFileName(filePath: string): string {
  return filePath.substring(filePath.lastIndexOf('\\') + 1);
}

downloadFile(fileUrl: string,event:MouseEvent): void {
  event.preventDefault();
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



toggleCollapse() {
 
  this.isCollapsed = !this.isCollapsed;
}

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


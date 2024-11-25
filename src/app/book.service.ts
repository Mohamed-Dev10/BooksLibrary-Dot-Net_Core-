import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Book } from './book/book.component';
import { CommentBook } from './CommentBook';
import { CommentResponse, RatingUpdateRequest, RatingUserBookResponse } from './bookinfo/bookinfo.component';


@Injectable({
  providedIn: 'root'
})


export class BookService {

  private apiUrl = 'https://localhost:44352/api/BookApi'; // Replace with your API URL
 
  constructor(private http: HttpClient) { }

  // ...
saveBookToFavoritBooksUser(bookid:number,userid:string){
 // alert("click bookService"+bookId+"!!!!!!! user id is !!"+userId);
const body={bookId:bookid,userId:userid};
// alert("!!!!");
// alert("after body");

const url=`${this.apiUrl}/AddFavoritBookForUser`;
// alert("url api!!!!"+url)
return this.http.post(url,body);

}


AddCommentToBook(bookid:number,userid:string,description:string){
 // alert("book id is "+bookid+"userid is  "+userid+"description is  "+description);

const body={bookid:bookid,userid:userid,description:description};
const urlApi=`${this.apiUrl}/AddCommentBook`;
//alert(urlApi)
return this.http.post(urlApi,body);
}

AddRatingToBook(bookid:number,userid:string,rating: number, event: MouseEvent){
  // alert("book id is "+bookid+"userid is  "+userid+"description is  "+description);
 alert("service rating methode");
 const body={bookid:bookid,userid:userid,ratingNumber:rating};
 const urlApi=`${this.apiUrl}/RateBook`;
 //alert(urlApi)
 return this.http.post(urlApi,body);
 }

 updateRatingBookByUser(bookId: number, userId: string, ratingNumber: number): Observable<RatingUpdateRequest> {
  const url = `${this.apiUrl}/UpdateRating/${bookId}/${userId}`;
  const ratingBookRequest: RatingUpdateRequest = {
    idBook: bookId,
    userid: userId,
    ratingNumber: ratingNumber
  };

  return this.http.put<RatingUpdateRequest>(url, ratingBookRequest, { headers: { 'Content-Type': 'application/json' } });
}




  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/GetAllBooks`);
  }

  getBookById(objectid: number): Observable<Book> {
   // alert("getBookById  "+objectid);
    const url = `${this.apiUrl}/GetBookById/${objectid}`;
   // alert("url  "+url);
    return this.http.get<Book>(url);
  }

  getCommentBookByBookIdAndUserId(idBook: number): Observable<CommentBook[]> {
    const url = `${this.apiUrl}/GetCommentBook/${idBook}`;
    return this.http.get<CommentBook[]>(url);
  }
  
  getRatingBookByUser(idBook: number,userid:string): Observable<RatingUserBookResponse> {
   
    const url = `${this.apiUrl}/GetRatingBook/${idBook}/${userid}`;
    return this.http.get<RatingUserBookResponse>(url);
  }
// getCommentBook():Observable<>{


// }

  displayAllBooks(): Observable<Book[]> {
    return this.getAllBooks().pipe(
      map((books: Book[]) => {
        books.forEach((book) => {
          const startIndex = book.fileUrl.indexOf('assets');
          book.fileUrl = book.fileUrl.substring(startIndex); // Update the fileUrl property
        });
        return books;
      })
    );
  }
}

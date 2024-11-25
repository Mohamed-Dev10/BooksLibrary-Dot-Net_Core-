import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import Swal from 'sweetalert2';
import { Observable } from 'rxjs/internal/Observable';
import * as $ from 'jquery';
import 'bootstrap';




export interface Book {
  objectid: number;
  titleBook: string;
  descriptionBook: string;
  fileUrl: string;
  imgBook: any; 
  imgUrl:string;
  PictureBook:any;// or File type, depending on your requirement
  author: Author;
  numberPage:number;
  numberDownlaods:number;
  numberViews:number;
  language:string;
}


export interface Author {
  
  objectid: number;
  nameAuthor: string;
  
}
declare var window: any;

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})


export class BookComponent {
  formModalBook:any;
  imageUrl: any;
  BookCoverUrl: any;
  bookFound: any = {};
  bookAuthorSelected: any = {};
  bookDto:any={};
  auth:Author={
    objectid:null!,
    nameAuthor: ''
    };
    
    bookForm: any = {
      objectid:0,
      titleBook: '',
      descriptionBook: '',
      fileUrl: '',
      imgBook:null,
      imgUrl:'',
      PictureBook:null 
    };
    
  
    bookFormUpdate: any = {
      titleBook: '',
      descriptionBook: '',
      fileUrl: '',
      imgBook: File,
      author:{
        objectid: null,
        nameAuthor: ''
      }
      };

  books: Book[] = [];
  authors: Author[] = [];
  imagePath!: string;
  BindingAuthor:Author[]=[];
  @ViewChild('updateBookModal') updateBookModal!: ElementRef;
  


  constructor(private http: HttpClient) { }

  
  
  generateAutoIncrement() {
    // Get the maximum objectid value from the existing books in your component
    const maxObjectId = Math.max(...this.books.map(book => book.objectid), 0);
  
    // Increment the maxObjectId by 1 and return as the new auto-increment value
    return maxObjectId + 1;
  }
  
  getAllAuthors() {
    return this.http.get<Author[]>('https://localhost:44352/api/AuthorApi/GetAllAuthors');
  }

  getAllBooks() {
    return this.http.get<Book[]>('https://localhost:44352/api/BookApi/GetAllBooks');
  }

  deleteBook(idBook: number) {
    Swal.fire({  
      title: 'Are you sure want to remove?',  
      text: 'You will not be able to recover this Book!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Yes, delete it!',  
      cancelButtonText: 'No, keep it'  
    }).then((result) => {  
      if (result.value) {  
        this.DeleteBook(idBook).subscribe(
          (data) => {
           
            this.DisplayAllBooks();
            Swal.fire(  
              'Deleted!',  
              'Your Book has been deleted.',  
              'success'  
            ) 
            
          },
          (error) => {
            console.error(error);
            // Handle the error response here
          }
        );
         
      } else if (result.dismiss === Swal.DismissReason.cancel) {  
        Swal.fire(  
          'Cancelled',  
          'Your Book is still safe ',  
          'error'  
        )  
      }  
    })
      
  }
  
  onFileSelected(event: any): void {
    this.bookForm.imgBook = event.target.files[0];
  }
  onFileSelectedImg(event: any): void {
    this.bookForm.PictureBook = event.target.files[0];
  }
 

  addBook() {
    const formData = new FormData();
   this.bookForm.objectid=this.generateAutoIncrement();
    formData.append('objectid', this.bookForm.objectid);
    formData.append('titleBook', this.bookForm.titleBook);
    formData.append('descriptionBook', this.bookForm.descriptionBook);
    formData.append('imgBook', this.bookForm.imgBook);
    formData.append('PictureBook', this.bookForm.PictureBook);
  
    this.http.post('https://localhost:44352/api/BookApi/AddBook', formData, {
      headers: {
        'auth': this.bookForm.auth.toString()
      }
    }).subscribe(
      (data: any) => {
        console.log(data);
        this.imageUrl=data.fileUrl;
        this.BookCoverUrl=data.imgUrl;
        Swal.fire({
          text: 'Book created successfully',
          icon: 'success'
        }).then(() => {
          // Handle any additional logic after the Swal message
        });
      },
      (error: any) => {
        console.error(error);
        Swal.fire({
          text: 'Failed to create book',
          icon: 'error'
        });
      }
    );
  }
  

  
  UpdateBook() {
  
    
    console.log(this.bookFound.objectid);
    console.log(this.bookFormUpdate);
    this.bookDto = {
      objectid: this.bookFound.objectid,
      titleBook: this.bookFormUpdate.titleBook,
      descriptionBook: this.bookFormUpdate.descriptionBook,
      fileUrl: this.bookFormUpdate.fileUrl    
    };
    
   // const authorJson = JSON.stringify(this.bookFormUpdate.author);
   // console.log(this.bookDto);
   // console.log(authorJson);
   // console.log(this.bookDto.authorDto);
   // console.log(this.bookFound.author.objectid);
      this.http.put('https://localhost:44352/api/BookApi/UpdateBook',this.bookFormUpdate, {
          headers: {
            'idBook': String(this.bookDto.objectid)
          }
      }).subscribe(
        (data) => {
          Swal.fire({
            text: 'book updated successfully',
            icon: 'success' 
          }).then((result) => {
            this.DisplayAllBooks();
          })
         
          
        },
        (error) => {
          console.error(error);
          // Handle the error response here
        }
      );
    }


  ngOnInit() {
    this.formModalBook=new window.bootstrap.Modal(
      document.getElementById("updateBookModal")
    );
    this.DisplayAllBooks();
    this.DisplayAllAuthors();
    console.log(this.DisplayAllAuthors());
   
  }

  showModal(idBook: number): void {
    
     this.bookFound=this.books.find(d=>d.objectid===idBook);
     this.bookFormUpdate.author=this.authors.find(a => a.objectid === this.bookFound.author.objectid);
    console.log(this.bookFound);
    if (this.bookFound) {
    //  console.log(book);
      
      console.log("book founded  "+this.bookFound)
      this.formModalBook.show();
    } else {
      console.log(`No book found with id ${idBook}`);
    }
  }
  

  HideModal(): void {
    // Call the `show` method on the modal element
    this.formModalBook.hide();
  }

  
  DisplayAllBooks(){

    this.getAllBooks().subscribe((response: any) => {
      this.books = response;

      console.log("list books "+this.books);
      
      this.books.forEach((book) => {
        const startIndex = book.fileUrl.indexOf("assets");
        book.fileUrl = book.fileUrl.substring(startIndex); // Update the fileUrl property
      });

      console.log("books url "+this.books);
    });
  }
  DisplayAllAuthors(){
    this.getAllAuthors().subscribe((response: any) => {
      this.authors = response;
      
      console.log(this.authors);
     
      
    });

  }
  DeleteBook(idBook: number): Observable<Book[]> {
    
    return this.http.delete<Book[]>(`https://localhost:44352/api/BookApi/DeleteBook/${idBook}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  downloadFile() {
    const url = '/assets/images/2.jpg';
    const filename = '2.jpg';
    this.http.get(url, { responseType: 'blob' })
      .subscribe((blob: Blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      });
  }
 
}


import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent {
  @Input() isFavorite: boolean = false;
  @Output() favoriteChanged = new EventEmitter<boolean>();

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.favoriteChanged.emit(this.isFavorite);
  }
}

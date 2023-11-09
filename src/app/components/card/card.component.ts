import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  isFlipped = false;
  cardValue = 'A'; // El valor inicial de la carta, puede ser cualquier otro número o letra
  disableHover: boolean = false;

  flipCard() {
    this.disableHover = true; 
    this.isFlipped = !this.isFlipped;

    setTimeout(() => {
      this.disableHover = false; // Habilita el hover después de que la animación haya terminado
    }, 500);
  }
}

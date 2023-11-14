import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardEntity } from '../../domain/card.entity';

@Component({
  selector: 'card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements AfterViewInit {
  private static contadorId = 0;
  public componentId: string;
  @ViewChild('card') miElemento!: ElementRef;
  @Input() 
  cardEntity!: CardEntity;

  constructor() {
    CardComponent.contadorId++;
    this.componentId = `mi-componente-${CardComponent.contadorId}`;
  }

  ngAfterViewInit(): void {
    console.log('Elemento capturado:', this.miElemento);
    console.log('ID del elemento:', this.miElemento.nativeElement.id);
    console.log(this.cardEntity);
    
  }

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

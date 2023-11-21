import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardEntity } from '../../domain/card.entity';
import { GameService } from '../../services/game.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../../domain/message.state';

@Component({
  selector: 'card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements AfterViewInit {
  @ViewChild('card') miElemento!: ElementRef;
  @Input() 
  cardEntity!: CardEntity;

  private static contadorId = 0;
  public componentId: string;
  public isFlipped = true;
  public disableHover: boolean = false;
  private game : BehaviorSubject<Message>;

  constructor(private gameService: GameService) {
    CardComponent.contadorId++;
    this.componentId = `mi-componente-${CardComponent.contadorId}`;
    this.game = this.gameService.game;
  }

  ngAfterViewInit(): void {
    // console.log('Elemento capturado:', this.miElemento);
    // console.log('ID del elemento:', this.miElemento.nativeElement.id);
    
  }

  flipCard() {
    if (!this.gameService.isGameStart) {
      return;
    }
    this.disableHover = true; 
    this.isFlipped = !this.isFlipped;

    setTimeout(() => {
      this.disableHover = false; 
      this.game.next({cardValue: this.cardEntity.value});
    }, 200);
  }
}

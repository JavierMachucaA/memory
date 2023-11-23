import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardEntity } from '../../domain/card.entity';
import { GameService } from '../../services/game.service';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../../domain/message.state';
import { Activity } from '../../domain/activity.enum';
import { Owner } from '../../domain/owner.enum';
import { FlipCard } from '../../domain/flipCard.entity';

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
  public Owner = Owner;
  private static contadorId = 0;
  public componentId: string;
  public isFlipped = true;
  public disableHover: boolean = false;
  private game : BehaviorSubject<Message>;

  constructor(private gameService: GameService) {
    CardComponent.contadorId++;
    this.componentId = `card-${CardComponent.contadorId}`;
    this.game = this.gameService.game;
  }

  ngAfterViewInit(): void {
    
    this.game.subscribe(
      ((message: Message) => {
        this.manageMessages(message);          
      }),
    )
  }

  private manageMessages(message: Message) {
    if (message.activity == Activity.FLIP_CARD && message.flipCard) {
      const flipCard: FlipCard = message.flipCard;
      if (flipCard.idFlipCard == this.cardEntity.id && flipCard.owner == Owner.SYSTEM && !this.isFlipped) {
        this.flipCard(flipCard.owner);
      }
    }
  }

  flipCard(owner: Owner) {
    if (!this.gameService.isGameStart) {
      return;
    }
    this.disableHover = true; 
    this.isFlipped = !this.isFlipped;

    setTimeout(() => {
      this.disableHover = false; 
      if (owner == Owner.USER)
        this.game.next({activity: Activity.STACK_CARD, stackCard: this.cardEntity });
    }, 200);
  }
}

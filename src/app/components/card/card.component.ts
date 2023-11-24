import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardEntity } from '../../domain/card.entity';
import { GameService } from '../../services/logic/game.service';
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
  public disableHover: boolean = true;
  private game : BehaviorSubject<Message>;
  private lockCardSubject : BehaviorSubject<Message>;
  public isTwinkling = false;
  public isDisappear = false;
  public lockCard = false;

  constructor(private gameService: GameService) {
    CardComponent.contadorId++;
    this.componentId = `card-${CardComponent.contadorId}`;
    this.game = this.gameService.game;
    this.lockCardSubject = this.gameService.lockCardsSubject
  }

  ngAfterViewInit(): void {
    this.game.subscribe(
      ((message: Message) => {
        this.manageMessages(message);          
      }),
    )
    this.lockCardSubject.subscribe(
      ((message: Message) => {
        console.log(message);
        this.lockCardActivity(message);      
      }),
    )
  }

  private manageMessages(message: Message) {
    this.flipCardActivity(message);
    this.pairMatch(message);
  }

  private lockCardActivity(message: Message) {
    if (message.activity == Activity.LOCK_CARDS && message.lockCard) {
      this.lockCard = message.lockCard.isLockCard;
    }
  }

  private flipCardActivity(message: Message) {
    if (message.activity == Activity.FLIP_CARD && message.flipCard) {
      const flipCard: FlipCard = message.flipCard;
      if (flipCard.idFlipCard == this.cardEntity.id && flipCard.owner == Owner.SYSTEM && !this.isFlipped) {
        this.flipCard();
      }
    }
  }

  flipCard() {
    this.isFlipped = true;
  }

  private pairMatch(message: Message) {
    if (message.activity == Activity.PAIR_MATCH) {
      this.animateCard()
    }
  }

  private animateCard() {
    this.lockCard = true;
    this.twinkling();
    this.disappear();
    setTimeout(() => {
      this.lockCard = false;
    }, 500);
  }

  private twinkling() {
    if (!this.isFlipped)
     this.isTwinkling = !this.isTwinkling;
  }

  private disappear() {
    if (!this.isFlipped && !this.isDisappear)
      this.isDisappear = !this.isDisappear;
  }

  // flip up card
  public openCard() {
    // console.log(this.isFlipped);
    if (!this.gameService.isGameStart) 
      return;
    if (!this.isFlipped)
      return;
    if (this.lockCard)
      return;
    this.disableHover = true; 
    this.isFlipped = false;
    setTimeout(() => {
      this.disableHover = false; 
      this.game.next({activity: Activity.STACK_CARD, stackCard: this.cardEntity });
    },100);
  }
  
}

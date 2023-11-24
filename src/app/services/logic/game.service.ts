import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Activity } from '../../domain/activity.enum';
import { CardEntity } from '../../domain/card.entity';
import { Message } from '../../domain/message.state';
import { Owner } from '../../domain/owner.enum';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _isGameStart = false;
  private _totalCards: number = 0;
  private _isPlayer1Turn: boolean = false;
  private _isPlayer2Turn: boolean = false;
  private pairCards: CardEntity[] = []
  private _player1Cards: CardEntity[] = [];
  private _player2Cards: CardEntity[] = [];

  public game : BehaviorSubject<Message> = new BehaviorSubject<Message>({activity: Activity.STANDBY});
  public lockCardsSubject: BehaviorSubject<Message> = new BehaviorSubject<Message>({activity: Activity.STANDBY});
  
  constructor() {
    this.game.subscribe(
      ((value: Message) => {
        this.manageEvents(value)
      }),
    )
  }
  
  private manageEvents(event: Message) {
    if (event.activity == Activity.STACK_CARD && event.stackCard)
      this.stackCards(event.stackCard);
  }

  public changeTurn() {
    
    this.game.next(this.getMessageChangeScore());
    if (!this.isPlayer1Turn && !this.isPlayer2Turn) {
      this.isPlayer1Turn = true;
      return;
    }
    this.isPlayer1Turn = !this.isPlayer1Turn;
    this.isPlayer2Turn = !this.isPlayer2Turn;
    // console.log('change turn to', this.isPlayer1Turn, this.isPlayer2Turn);
  }
  
  private flipCards() {
      // console.log("flipCards");
      console.log(this.pairCards[0].id, this.pairCards[1].id);
      this.game.next(this.getMessageFlipCard(this.pairCards[0].id))
      this.game.next(this.getMessageFlipCard(this.pairCards[1].id))
      this.pairCards = [];
  }

  public getScore(list: CardEntity[]) : number {
    return list.length * 100;
  }

  private stackCards(cardEntity: CardEntity) {
    if (cardEntity.value != '' ) {
      this.pairCards.push(cardEntity);
    }
    
    if (this.pairCards.length < 2) {
      return;
    }
    // console.log('stacked cards:', this.pairCards);
    
    // same card
    this.isSameCard()
  }

  private isSameCard() {
    
  // same card
    if (this.pairCards[0].value == this.pairCards[1].value && 
        this.pairCards[0].suite == this.pairCards[1].suite) {
      this.lockCardsSubject.next(this.getMessageLockCard(true));
      if(this.isPlayer1Turn) {
        // console.log('match for p1:',this.pairCards)
        this.player1Cards.push(this.pairCards[0]);
      }

      if(this.isPlayer2Turn) {
        // console.log('match for p2:',this.pairCards)
        this.player2Cards.push(this.pairCards[0]);
      }
      this.pairCards = []
      this.game.next(this.getMessagePairMatch());
      
      setTimeout(() => {
        this.game.next(this.getMessageChangeScore());
        this.validateGameOver();  
        this.lockCardsSubject.next(this.getMessageLockCard(false));
      }, 500);
    } else {
      // console.log('no match:',this.pairCards);
      this.lockCardsSubject.next(this.getMessageLockCard(true));
      setTimeout(() => {
        this.flipCards();
        this.changeTurn();
        this.lockCardsSubject.next(this.getMessageLockCard(false));
      }, 2000);
    }
  } 

  private getMessageLockCard(isLockCard: boolean) : Message {
    return {
      activity: Activity.LOCK_CARDS, 
      lockCard: {
        isLockCard: isLockCard
      }
    };
  }

  private validateGameOver() {
    // console.log(this.player1Cards.length, this.player2Cards.length, this._totalCards);
    const totalPairs = (this.player1Cards.length + this.player2Cards.length) * 2;
    if ( totalPairs == this._totalCards) {
      this.gameOver();
    }
  }

  private gameOver() {
    this.game.next(this.getMessageGameOver());
  }

  private getMessageFlipCard(id: number) : Message {
    return {
      activity: Activity.FLIP_CARD, 
      flipCard: {
        idFlipCard : id, 
        owner: Owner.SYSTEM
      }
    }
  }

  private getMessageChangeScore() : Message {
    return {
      activity: Activity.SCORE, 
      score: {
        isPlayer1Turn: this._isPlayer1Turn,
        isPlayer2Turn: this._isPlayer2Turn,
        owner: Owner.SYSTEM
      }
    }
  }

  private getMessagePairMatch() : Message {
    return {
      activity: Activity.PAIR_MATCH,
    }
  }

  private getMessageGameOver() : Message {
    return {
      activity: Activity.GAME_OVER,
    }
  }

  //ACCESSORS
  public get  isGameStart(): boolean {
    return this._isGameStart;
  }
  
  public set isGameStart(value: boolean) {
    this._isGameStart = value;
  }

  public get isPlayer1Turn(): boolean {
    return this._isPlayer1Turn;
  }
  
  public set isPlayer1Turn(value: boolean) {
    this._isPlayer1Turn = value;
  }

  public get isPlayer2Turn(): boolean {
    return this._isPlayer2Turn;
  }
  
  public set isPlayer2Turn(value: boolean) {
    this._isPlayer2Turn = value;
  }

  public get player1Cards(): any[] {
    return this._player1Cards;
  }

  public set player1Cards(value: any[]) {
    this._player1Cards = value;
  }
  
  public get player2Cards(): any[] {
    return this._player2Cards;
  }
  
  public set player2Cards(value: any[]) {
    this._player2Cards = value;
  }

  public get totalCards(): number {
    return this._totalCards;
  }

  public set totalCards(value: number) {
    this._totalCards = value;
  }
}

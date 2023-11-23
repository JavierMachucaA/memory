import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Message } from '../domain/message.state';
import { Activity } from '../domain/activity.enum';
import { CardEntity } from '../domain/card.entity';
import { Owner } from '../domain/owner.enum';

/**
 *   LOGIC
  block table
  press start
  player 1 start
  click on 2 cards
  if are the same number and suit
    twinkling and disappear
    additon to pairs and points to the player turn
    not change turn
  else
    flip the cards 
    change turn
  
 */
@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _isGameStart = false;
  private pairCards: CardEntity[] = []
  private _player1Cards: any[] = [];
  private _player2Cards: any[] = [];

  /** OBSERVABLE
     Implements observable game variable on the first step admin all actions, but later separate observables for recover differents thinks like:
    1 - player turn
    2 - points
    3 - twinkling and disappear
    4 - flip cards
   */
  
  public game = new BehaviorSubject<Message>({activity: Activity.STANDBY});
  
    
  private _isPlayer1Turn: boolean = false;
  private _isPlayer2Turn: boolean = false;
  
  /**
   * ACTIONS
     TODO: actions to resolve
      1 change turn READY 
      2 recieve cardValue
      3 stack 2 cards
      4 twinkling
      5 disappear
      6 get player turn
      7 add pairs and points the player turn
      8 flip cards
      
   */

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
    if (!this.isPlayer1Turn && !this.isPlayer2Turn) {
      this.isPlayer1Turn = true;
      return;
    }
    this.isPlayer1Turn = !this.isPlayer1Turn;
    this.isPlayer2Turn = !this.isPlayer2Turn;
  }

  private twinkling() {
    console.log("twinkling");
  }

  private disappear() {
    console.log("disappear");
  }
  
  private flipCards() {
      console.log("flipCards");
      this.game.next({activity: Activity.FLIP_CARD, flipCard: {idFlipCard : this.pairCards[0].id, owner: Owner.SYSTEM}})
      this.game.next({activity: Activity.FLIP_CARD, flipCard: {idFlipCard : this.pairCards[1].id, owner: Owner.SYSTEM}})  
      this.pairCards = [];
  }

  public getScore(list: []) : number {
    return list.length * 100;
  }

  private handleError(error : any) {
    console.error(error);
  }

  private stackCards(cardEntity: CardEntity) {
    if (cardEntity.value != '' ) {
      this.pairCards.push(cardEntity);
    }

    if (this.pairCards.length < 2) {
      return;
    }
    console.log('stacked cards:', this.pairCards);
    
    // same card
    if (this.pairCards[0] == this.pairCards[1]) {
      if(this.isPlayer1Turn) {
        console.log('match for p1:',this.pairCards)
        this.player1Cards.push(this.pairCards[0]);
      }

      if(this.isPlayer2Turn) {
        console.log('match for p2:',this.pairCards)
        this.player2Cards.push(this.pairCards[0]);
      }
      this.twinkling();
      this.disappear();
    } else {
      console.log('no match:',this.pairCards);
      setTimeout(() => {
      this.flipCards();
      this.changeTurn();
      }, 2000);
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

}

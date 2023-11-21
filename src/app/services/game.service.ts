import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Message } from '../domain/message.state';

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
  /** OBSERVABLE
     Implements observable game variable on the first step admin all actions, but later separate observables for recover differents thinks like:
    1 - player turn
    2 - points
    3 - twinkling and disappear
    4 - flip cards
   */
  
  public game = new BehaviorSubject<Message>({cardValue:''});
  
    
  private _isPlayer1Turn: boolean = false;
  private _isPlayer2Turn: boolean = false;
  
  /**
   * ACTIONS
     TODO: actions to resolve
      1 change turn READY and stack 2 cards
      2 recieve cardValue
      3 twinkling
      4 disappear
      5 get player turn
      6 add pairs and points the player turn
      7 flip cards
      
   */

  constructor() {
    this.game.subscribe({
      next: this.manageEvents.bind(this),
      error: this.handleError.bind(this),
    }
    ); 
  }
  
  private manageEvents(event: any) {
    console.log(event);
    
  }

  public changeTurn() {
    if (!this.isPlayer1Turn && !this.isPlayer2Turn) {
      this.isPlayer1Turn = true;
      return;
    }
    
    this.isPlayer1Turn = !this.isPlayer1Turn;
    this.isPlayer2Turn = !this.isPlayer2Turn;
  }

  private twinkling() {}

  private disappear() {}

  private getPlayerTurn() {}
  
  private points() {}
  
  private flipCards() {}

  private handleError(error : any) {
    console.error(error);
    
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
}

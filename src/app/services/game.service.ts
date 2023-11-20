import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  /* 
  Implements observable game variable
  on the first step admin all actions but later separate observables for recover differents thinks like:
  1 - player turn
  2 - points
  3 - twinkling and disappear
  4 - flip cards
  =======================
  LOGIC
  player 1 start
  click on 2 cards
  if are the same number and suit
    twinkling and disappear
    additon to pairs and points to the player turn
    not change turn
  else
    flip the cards 
    change turn
  =======================
  TODO: actions to resolve
  1 change turn
  2 twinkling
  3 disappear
  4 get player turn
  5 add pairs and points the player turn
  6 flip cards
 */

  constructor() { }



}

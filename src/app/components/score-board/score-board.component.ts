import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'score-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-board.component.html',
  styleUrl: './score-board.component.scss'
})
export class ScoreBoardComponent {
  constructor(public gameService: GameService) {}

  public startGame() {
    this.gameService.isGameStart = true;
    this.gameService.changeTurn();
  }

  

  //ACCESSORS
  get isGameStart() {
    return this.gameService.isGameStart;
  }

  get isPlayer1Turn () {
    return this.gameService.isPlayer1Turn;
  }
  
  get isPlayer2Turn () {
    return this.gameService.isPlayer2Turn;
  }
}

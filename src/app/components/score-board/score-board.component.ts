import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/logic/game.service';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../../domain/message.state';
import { Activity } from '../../domain/activity.enum';
import { Score } from '../../domain/changeTurn.entity';

@Component({
  selector: 'score-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-board.component.html',
  styleUrl: './score-board.component.scss'
})
export class ScoreBoardComponent {
  private game : BehaviorSubject<Message>;

  public pairsPlayer1: number = 0;
  public pairsPlayer2: number = 0;
  public pointsPlayer1: number = 0;
  public pointsPlayer2: number = 0;
  public messageGameOver1 : string = '';
  public messageGameOver2 : string = '';

  constructor(public gameService: GameService) {
    this.game = this.gameService.game;
  }

  public startGame() {
    this.gameService.isGameStart = true;
    this.gameService.changeTurn();
    this.hearGame();
  }

  private hearGame() {
    this.game.subscribe(
      ((message: Message) => {
        this.activityChangeScore(message);
        this.activityGameOver(message);
      }),
    );
  }

  private activityChangeScore(message: Message) {
    if (message.activity == Activity.SCORE && message.score) {
      this.changeScore(message.score);
    }
  }

  private activityGameOver(message: Message) {
    if (message.activity == Activity.GAME_OVER) {
      this.showGameOver();
    }
  }

  private changeScore(score: Score) {
    if (score.isPlayer1Turn) {
      this.pairsPlayer1 = this.gameService.player1Cards.length;
      this.pointsPlayer1 = this.gameService.getScore(this.gameService.player1Cards);
    }

    if (score.isPlayer2Turn) {
      this.pairsPlayer2 = this.gameService.player2Cards.length;
      this.pointsPlayer2 = this.gameService.getScore(this.gameService.player2Cards);
    }
  }

  private showGameOver() {
    
    // The player with the most points wins
    if (this.pointsPlayer1 == this.pointsPlayer2) {
      // DRAW
      this.messageGameOver1 = this.messageGameOver2 = 'PLAYER 1 AND PLAYER 2 DRAW';
    }
    if (this.pointsPlayer1 > this.pointsPlayer2) {
      // PLAYER 1 WINS
      this.messageGameOver1 = 'PLAYER 1 WINS';
    } else {
      // PLAYER 2 WINS
      this.messageGameOver2 = 'PLAYER 2 WINS';
    } 
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

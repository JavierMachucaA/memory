import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'score-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-board.component.html',
  styleUrl: './score-board.component.scss'
})
export class ScoreBoardComponent {
  public isPlayer1Turn : boolean = false;
  public isPlayer2Turn : boolean = false;

  public changeTurn() {
    if ((!this.isPlayer1Turn && !this.isPlayer2Turn)) {
      this.isPlayer1Turn = true;
    }else {
      this.isPlayer1Turn = !this.isPlayer1Turn;
      this.isPlayer2Turn = !this.isPlayer2Turn;
    }
  }
  
}

import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { CardEntity } from './domain/card.entity';
import { CalculateCardsService } from './services/logic/calculate-cards.service';
import { CardContentService } from './services/logic/card-content.service';
import { ScoreBoardComponent } from './components/score-board/score-board.component';
import { GameService } from './services/logic/game.service';
import { HEART } from './util/suits.constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CardComponent,ScoreBoardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public title = 'memory-play';
  protected cardsCount: number = 0;
  public cards: CardEntity[][] = [];
  public valuesCards: string[] = [];
  public cardsReady: boolean = false;
  public cardsRowCount: number = 0;
  public rowCount: number = 0;
  public showPopup = false;
  public elm!: HTMLElement;
  public blockCardTable = true;

  @ViewChild('table_content') elemento!: ElementRef;
  
  constructor(
    private calculateCardsService: CalculateCardsService,
    private cardContentService: CardContentService,
    private gameService: GameService
  ) { }

  ngAfterViewInit(): void {
     this.obtenerDimensiones();
  }
  
  close(): void {
      this.elm.classList.remove('show');
      setTimeout(() => {
        this.elm.style.width = '0';
      }, 75);
  }
  open(): void {
      this.elm.classList.add('show');
      this.elm.style.width = '100vw';
  }

  obtenerDimensiones() {
    this.calculateCardsService.heightTable = this.elemento.nativeElement.offsetWidth;
    this.calculateCardsService.widthTable  = this.elemento.nativeElement.offsetHeight;
    // console.log(`Ancho: ${this.calculateCardsService.heightTable}px, Alto: ${this.calculateCardsService.widthTable}px`);
    this.cardsCount = this.calculateCardsService.calculateCards();
    this.gameService.totalCards = this.cardsCount;
    this.cardsRowCount = this.calculateCardsService.cardsRowCount;
    this.rowCount = this.calculateCardsService.rowCount;
    this.valuesCards = this.cardContentService.setCardValues(this.cardsCount);
    // console.log(this.valuesCards);
    
    this.llenarTarjetas(this.cardsCount);
  }

  fillCards(totalTarjetas: number): Promise<void> {
    return new Promise((resolve) => {
      let totalCount: number = totalTarjetas;
      for (let indexRow = 0; indexRow < totalTarjetas; indexRow += this.cardsRowCount) {
        //get totaltarjetas faltantes
        let rowCreate : number = 0;
        if (totalCount > this.cardsRowCount) {
          totalCount-=this.cardsRowCount;
          rowCreate = this.cardsRowCount;
        } else {
          rowCreate = totalCount;
        }
        const listRow : CardEntity[]=[];
        for(let indexColumn = 0 ; indexColumn < rowCreate; indexColumn++ ) {
          const card : CardEntity = new CardEntity(
            indexColumn + indexRow,
            this.calculateCardsService.cardWidth,
            this.calculateCardsService.cardHeight,
            this.valuesCards[indexRow+indexColumn],
            HEART
            );
          listRow.push(card);
        }
        
        this.cards.push(listRow);
      }
      resolve();
    });
  }

  llenarTarjetas(totalTarjetas: number) {
    this.fillCards(totalTarjetas).then(() => {
      setTimeout(() => {
        this.cardsReady = true;
      }, 100);
    });
  }

  get isGameStart() {
    return this.gameService.isGameStart
  }
}

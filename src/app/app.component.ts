import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { CardEntity } from './domain/card.entity';
import { CalculateCardsService } from './services/logic/calculate-cards.service';
import { CardContentService } from './services/logic/card-content.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CardComponent,],
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

  @ViewChild('table_content') elemento!: ElementRef;

  constructor(private calculateCardsService: CalculateCardsService,
    private cardContentService: CardContentService
  ) { }

  ngAfterViewInit() {
    this.obtenerDimensiones();
  }

  obtenerDimensiones() {
    this.calculateCardsService.heightTable = this.elemento.nativeElement.offsetWidth;
    this.calculateCardsService.widthTable  = this.elemento.nativeElement.offsetHeight;
    console.log(`Ancho: ${this.calculateCardsService.heightTable}px, Alto: ${this.calculateCardsService.widthTable}px`);
    this.cardsCount = this.calculateCardsService.calculateCards();
    this.cardsRowCount = this.calculateCardsService.cardsRowCount;
    this.rowCount = this.calculateCardsService.rowCount;
    this.valuesCards = this.cardContentService.setCardValues(this.cardsCount);
    console.log(this.valuesCards);
    
    this.llenarTarjetas(this.cardsCount);
  }

  fillCards(totalTarjetas: number): Promise<void> {
    return new Promise((resolve) => {
      let totalCount: number = totalTarjetas;
      for (let i = 0; i < totalTarjetas; i += this.cardsRowCount) {
        //get totaltarjetas faltantes
        let rowCreate : number = 0;
        if (totalCount > this.cardsRowCount) {
          totalCount-=this.cardsRowCount;
          rowCreate = this.cardsRowCount;
        } else {
          rowCreate = totalCount;
        }
        // const listRow = Array.from(
        //   {length: rowCreate}, 
        //   (_, j) => new CardEntity(this.calculateCardsService.cardWidth, this.calculateCardsService.cardHeight, "A"))
        const listRow : CardEntity[]=[];
        for(let j = 0 ; j < rowCreate; j++ ) {
          const card : CardEntity = new CardEntity(this.calculateCardsService.cardWidth, this.calculateCardsService.cardHeight,this.valuesCards[i+j]);
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
}

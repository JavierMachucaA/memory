import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { CalculateCardsService } from './services/logic/calculate-cards.service';
import { CardEntity } from './domain/card.entity';

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
  public cards: CardEntity[] = [];
  public cardsReady: boolean = false;
  @ViewChild('table_content') elemento!: ElementRef;

  constructor(private calculateCardsService: CalculateCardsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    this.obtenerDimensiones();
  }

  obtenerDimensiones() {
    const ancho = this.elemento.nativeElement.offsetWidth;
    const alto = this.elemento.nativeElement.offsetHeight;
    console.log(`Ancho: ${ancho}px, Alto: ${alto}px`);
    this.calculateCardsService.heightTable = alto;
    this.calculateCardsService.widthTable = ancho;
    this.cardsCount = this.calculateCardsService.calculateCards();
    this.llenarTarjetas(this.cardsCount);
  }

  fillCards(totalTarjetas: number): Promise<void> {
    return new Promise((resolve) => {
      for (let i = 0; i < totalTarjetas; i++) {
        const newCard = new CardEntity(this.calculateCardsService.cardWidth, this.calculateCardsService.cardHeight, "A");
        this.cards.push(newCard);
      }
      resolve();
    });
  }

  llenarTarjetas(totalTarjetas: number) {
    this.fillCards(totalTarjetas).then(() => {
      setTimeout(() => {
        this.cardsReady = true;
      }, 200);
    });
  }
}

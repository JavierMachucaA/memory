import { Injectable } from '@angular/core';
import { CardEntity } from '../../domain/card.entity';

@Injectable({
  providedIn: 'root'
})
export class CalculateCardsService {
  private _heightTable: number = 0;
  private _widthTable: number = 0;
  private _cardsTotalPoolCount: number = 0;
  private _cardWidth: number = 0;
  private _cardHeight: number = 0;
  private _paddingXY: number = 0;
  private _gapXY: number = 0;
  private _cardsPool: CardEntity[] = [];

  public cardsRowCount: number = 0;
  public rowCount: number = 0;
  
  constructor() { }

  public calculateCards() : number{
    this.cardWidth = 200;
    this.cardHeight = 300;
    this.paddingXY = 10;
    this.gapXY = 10;

    const anchoTable = this.widthTable; // Ancho disponible del componente table
    const altoTable = this.heightTable; // Alto disponible del componente table
    
    // Calcular tarjetas por fila y columna
    this.cardsRowCount = Math.floor( altoTable/ (this._cardWidth + this.paddingXY ));
    this.rowCount = Math.floor( anchoTable/ (this._cardHeight + this.paddingXY ));
    
    // Calcular número total de tarjetas
    this.cardsTotalPoolCount = this.cardsRowCount * this.rowCount;
    if (this.cardsTotalPoolCount % 2 != 0) {
      this.cardsTotalPoolCount -= 1;
    }
    return this.cardsTotalPoolCount;
  }

  public get heightTable(): number {
    return this._heightTable;
  }
  public set heightTable(value: number) {
    this._heightTable = value;
  }

  public get widthTable(): number {
    return this._widthTable;
  }

  public set widthTable(value: number) {
    this._widthTable = value;
  }
  
  public get cardsTotalPoolCount(): number {
    return this._cardsTotalPoolCount;
  }
  
  public set cardsTotalPoolCount(value: number) {
    this._cardsTotalPoolCount = value;
  }

  public get cardsPool(): CardEntity[] {
    return this._cardsPool;
  }
  public set cardsPool(value: CardEntity[]) {
    this._cardsPool = value;
  }

  public get cardWidth(): number {
    return this._cardWidth;
  }
  public set cardWidth(value: number) {
    this._cardWidth = value;
  }
  public get cardHeight(): number {
    return this._cardHeight;
  }
  public set cardHeight(value: number) {
    this._cardHeight = value;
  }
  public get paddingXY(): number {
    return this._paddingXY;
  }
  public set paddingXY(value: number) {
    this._paddingXY = value;
  }
  
  public get gapXY(): number {
    return this._gapXY;
  }
  public set gapXY(value: number) {
    this._gapXY = value;
  }
}

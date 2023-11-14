import { Injectable } from '@angular/core';
import { CardEntity } from '../../domain/card.entity';

@Injectable({
  providedIn: 'root'
})
export class CalculateCardsService {
  private _heightTable: number = 0;
  private _widthTable: number = 0;
  private _cardsCount: number = 0;
  private _cardWidth: number = 0;

  private _cardHeight: number = 0;

  private _cardsPool: CardEntity[] = [];

  constructor() { }

  public calculateCards() : number{
    this.cardWidth = 200;
    this.cardHeight = 300;
    const margenX = 10; // Margen horizontal entre tarjetas
    const margenY = 10; // Margen vertical entre tarjetas

    const anchoTable = this.widthTable; // Ancho disponible del componente table
    const altoTable = this.heightTable; // Alto disponible del componente table

    // Calcular tarjetas por fila y columna
    const tarjetasPorFila = Math.floor(anchoTable / (this._cardWidth + margenX));
    const tarjetasPorColumna = Math.floor(altoTable / (this._cardWidth + margenY));

    // Calcular número total de tarjetas
    this.cardsCount = tarjetasPorFila * tarjetasPorColumna;
    console.log(this.cardsCount);
    
    return this.cardsCount;
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
  
  public get cardsCount(): number {
    return this._cardsCount;
  }
  
  public set cardsCount(value: number) {
    this._cardsCount = value;
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
  
}

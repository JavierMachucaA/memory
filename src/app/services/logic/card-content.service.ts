import { Injectable } from '@angular/core';

//Get the values and figures for every card pool
@Injectable({
  providedIn: 'root'
})
export class CardContentService {
  private cardValues: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  private outPutArrayValues: string[] = [];
  constructor() { }

  /**
   * Generate pairs of values on base cardValue
   * 1 - Get total (always is even)
   * 2 - Calculate create pairs (total/2)
   * 3 - Generate array duplicity values and shuffle
   * 
   * @param totalCards 
   * @returns 
   */
  public setCardValues(totalCards: number): string[] {
    let pairs = totalCards / 2;
    this.outPutArrayValues = []; 
    // Generar valores duplicados
    for (let i = 0; i < pairs; i++) {
      // Elige un valor de 'values' y lo añade dos veces a 'cardValues'
      let value = this.cardValues[i % this.cardValues.length];
      this.outPutArrayValues.push(value, value);
    }

    // Barajar los valores
    this.shuffleArray(this.outPutArrayValues);
    return this.outPutArrayValues;
  }

  // Función para barajar un array
  private shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

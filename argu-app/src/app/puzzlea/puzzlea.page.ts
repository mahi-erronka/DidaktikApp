import { Component, OnInit } from '@angular/core';


interface PuzzlePiece {
  id: number;
  url: string;
}
@Component({
  selector: 'app-puzzlea',
  templateUrl: './puzzlea.page.html',
  styleUrls: ['./puzzlea.page.scss'],
})
export class PuzzleaPage implements OnInit {


  puzzle: PuzzlePiece[][] = [];
  emptyPosition!: { row: number, col: number };

  constructor() { 
    this.initializePuzzle();
  }

  initializePuzzle() {
    const imageUrls = [
      '../../assets/img/pieza1.jpg','../../assets/img/pieza2.jpg','../../assets/img/pieza3.jpg','../../assets/img/pieza4.jpg','../../assets/img/pieza5.jpg','../../assets/img/pieza6.jpg','../../assets/img/pieza7.jpg','../../assets/img/pieza8.jpg','../../assets/img/pieza9.jpg','../../assets/img/pieza10.jpg','../../assets/img/pieza11.jpg','../../assets/img/pieza12.jpg'
    ];
    //piezak nahastu 
    imageUrls.sort(() => Math.random() - 0.5);

    //piezak sortu
    const pieces: PuzzlePiece[] = imageUrls.map((url, index) => ({ id: index + 1, url }));

    //piezak filetan eta zutabeetan zatitu
    const rows = 3; 
    const cols = 4; 
    
    this.puzzle = [];
    for (let i = 0; i < rows; i++) {
      this.puzzle.push(pieces.slice(i * cols, i * cols + cols));
    }

    this.emptyPosition = this.findEmptyPosition();

  }
  findEmptyPosition(): { row: number, col: number } {
    for (let row = 0; row < this.puzzle.length; row++) {
      for (let col = 0; col < this.puzzle[row].length; col++) {
        if (this.puzzle[row][col].id === 0) {
          return { row, col };
        }
      }
    }
    return { row: -1, col: -1 }; // No debería ocurrir si la lógica es correcta
  }

  movePiece(piece: PuzzlePiece) {
    const piecePosition = this.findPiecePosition(piece);
    
    // Verifica si la pieza seleccionada está adyacente a la pieza vacía
    if (this.isAdjacent(piecePosition)) {
      // Intercambia las posiciones de la pieza y la pieza vacía
      [this.puzzle[piecePosition.row][piecePosition.col], this.puzzle[this.emptyPosition.row][this.emptyPosition.col]] =
        [this.puzzle[this.emptyPosition.row][this.emptyPosition.col], this.puzzle[piecePosition.row][piecePosition.col]];

      // Actualiza la posición de la pieza vacía
      this.emptyPosition = piecePosition;
    }
  }

  findPiecePosition(piece: PuzzlePiece): { row: number, col: number } {
    for (let row = 0; row < this.puzzle.length; row++) {
      for (let col = 0; col < this.puzzle[row].length; col++) {
        if (this.puzzle[row][col].id === piece.id) {
          return { row, col };
        }
      }
    }
    return { row: -1, col: -1 }; // No debería ocurrir si la lógica es correcta
  }

  isAdjacent(position: { row: number, col: number }): boolean {
    const rowDiff = Math.abs(position.row - this.emptyPosition.row);
    const colDiff = Math.abs(position.col - this.emptyPosition.col);

    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
  }

  ngOnInit() {
  }

}

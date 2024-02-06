import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@capacitor/status-bar';


interface PuzzlePiece {
  placed: boolean;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

@Component({
  selector: 'app-puzzlea',
  templateUrl: './puzzlea.page.html',
  styleUrls: ['./puzzlea.page.scss'],
})


export class PuzzleaPage implements OnInit {
  
  containerWidth = 400;
  containerHeight = 300;

  rows = 3;
  cols = 4;

  pieceWidthPercentage = 50/this.cols;
  pieceHeightPercentage = 50/this.rows;

  
  originalPositions: PuzzlePiece[]=[
    {src: '../../assets/img/pieza1.jpg', x: 225, y: 433.35, width: 75, height: 66.67, zIndex: 1, placed: true},
    {src: '../../assets/img/pieza2.jpg', x: 150, y: 433.35, width: 75, height: 66.67, zIndex: 1, placed: true},
    {src: '../../assets/img/pieza3.jpg', x: 75, y: 433.35, width: 75, height: 66.67, zIndex: 1, placed: true},
    {src: '../../assets/img/pieza4.jpg', x: 0, y: 433.35, width: 75, height: 66.67, zIndex: 1, placed: true},
    {src: '../../assets/img/pieza5.jpg', x: 225, y: 366.68, width: 75, height: 66.67, zIndex: 1, placed: true},
    {src: '../../assets/img/pieza6.jpg', x: 150, y: 366.68, width: 75, height: 66.67, zIndex: 1, placed: true},
    {src: '../../assets/img/pieza7.jpg', x: 75, y: 366.68, width: 75, height: 66.67, zIndex: 1, placed: true},
    {src: '../../assets/img/pieza8.jpg', x: 0, y: 366.68, width: 75, height: 66.67, zIndex: 1, placed: true},
    {src: '../../assets/img/pieza9.jpg', x: 225, y: 300.01, width: 75, height: 66.67, zIndex: 1, placed: true},
    {src: '../../assets/img/pieza10.jpg', x: 150, y: 300.01, width: 75, height: 66.67, zIndex: 1, placed: true},
    {src: '../../assets/img/pieza11.jpg', x: 75, y: 300.01, width: 75, height: 66.67, zIndex: 1, placed: true},
    {src: '../../assets/img/pieza12.jpg', x: 0, y: 300.01, width: 75, height: 66.67, zIndex: 1, placed: true}
  ];

 
  
  pieces: PuzzlePiece[]=[
  {src: '../../assets/img/pieza1.jpg', x: 0, y: 0, width: 75, height: 66.67, zIndex: 1, placed: false},
  {src: '../../assets/img/pieza2.jpg', x: 0, y: 0, width: 75, height: 66.67, zIndex: 1, placed: false},
  {src: '../../assets/img/pieza3.jpg', x: 0, y: 0, width: 75, height: 66.67, zIndex: 1, placed: false},
  {src: '../../assets/img/pieza4.jpg', x: 0, y: 0, width: 75, height: 66.67, zIndex: 1, placed: false},
  {src: '../../assets/img/pieza5.jpg', x: 0, y: 0, width: 75, height: 66.67, zIndex: 1, placed: false},
  {src: '../../assets/img/pieza6.jpg', x: 0, y: 0, width: 75, height: 66.67, zIndex: 1, placed: false},
  {src: '../../assets/img/pieza7.jpg', x: 0, y: 0, width: 75, height: 66.67, zIndex: 1, placed: false},
  {src: '../../assets/img/pieza8.jpg', x: 0, y: 0, width: 75, height: 66.67, zIndex: 1, placed: false},
  {src: '../../assets/img/pieza9.jpg', x: 0, y: 0, width: 75, height: 66.67, zIndex: 1, placed: false},
  {src: '../../assets/img/pieza10.jpg', x: 0, y: 0, width: 75, height: 66.67, zIndex: 1, placed: false},
  {src: '../../assets/img/pieza11.jpg', x: 0, y: 0, width: 75, height: 66.67, zIndex: 1, placed: false},
  {src: '../../assets/img/pieza12.jpg', x: 0, y: 0, width: 75, height: 66.67, zIndex: 1, placed: false}
  ];
  
  selectedPieceIndex: number = -1;
  offsetX: number = 0;
  offsetY: number = 0;
  completed: boolean = false;

  //MAPA
  mapa_visible = 'hidden';
  mapa_botoia = 'true';
  panel_visible = 'hidden';

  //AUDIO
  audio_1 : any;
  audio_2 : any;
  audio_active : any;

  constructor(private route: Router) { 
    
  }

  selectPiece(index: number) {
    this.selectedPieceIndex = index;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  startDrag(event: TouchEvent) {
    event.preventDefault();
    if ('touches' in event) {

      const touch = event.touches[0];
      const touchedElement = document.elementFromPoint(touch.clientX, touch.clientY);
      

      if (touchedElement && touchedElement.classList.contains('piece')){
        
        
        
        if (this.selectedPieceIndex !== -1) {
          this.pieces[this.selectedPieceIndex].zIndex = 2;
          this.offsetX = touch.clientX - this.pieces[this.selectedPieceIndex].x;
          this.offsetY = touch.clientY - this.pieces[this.selectedPieceIndex].y;

          document.addEventListener('touchmove', this.handleDrag.bind(this));
          document.addEventListener('touchend', this.endDrag.bind(this));
        }
      }
    }
    /*if (this.selectedPieceIndex !== -1) {
      this.offsetX = event.clientX - this.pieces[this.selectedPieceIndex].x;
      this.offsetY = event.clientY - this.pieces[this.selectedPieceIndex].y;

      document.addEventListener('mousemove', this.handleDrag.bind(this));
      document.addEventListener('mouseup', this.endDrag.bind(this));
    }*/
  }

  endDrag() {
    document.removeEventListener('touchmove', this.handleDrag.bind(this));
    document.removeEventListener('touchend', this.endDrag.bind(this));
    this.pieces[this.selectedPieceIndex].zIndex = 1;
   
    this.selectedPieceIndex = -1;
    this.offsetX = 0;
    this.offsetY = 0;

    this.checkPuzzle();
  }

  handleDrag(event: TouchEvent) {
    event.preventDefault();
    const touch = event.touches[0];
    if (this.selectedPieceIndex !== -1) {
      this.pieces[this.selectedPieceIndex].x = touch.clientX - this.offsetX;
      this.pieces[this.selectedPieceIndex].y = touch.clientY - this.offsetY ;

      this.checkProximity();
    }
  }

  checkProximity() {
    const snapDistance = 20; // Ajusta la distancia de proximidad según sea necesario

    const piece = this.pieces[this.selectedPieceIndex];

    for (let i = 0; i < this.pieces.length; i++) {
      
      const originalPiece = this.originalPositions[i];
      

      const distance = Math.sqrt(
        Math.pow(piece.x - originalPiece.x, 2) + Math.pow(piece.y - originalPiece.y, 2)
      );
      
      if (distance < snapDistance) {
        // La pieza está lo suficientemente cerca, ajustar automáticamente
        this.pieces[this.selectedPieceIndex].x = originalPiece.x;
        this.pieces[this.selectedPieceIndex].y = originalPiece.y;

        this.pieces[this.selectedPieceIndex].placed = true;
        break;
      }
    }  

  }
  
  checkPuzzle(){
    let correct = true;
    for(let i = 0;i< this.pieces.length;i++){
      const piece = this.pieces[i];
      const originalPiece = this.originalPositions[i];

      if(piece.x !== originalPiece.x || piece.y !== originalPiece.y){
        correct = false;
        break;
      }
    }

    if(correct){
      this.completed = true;
      this.mapa_botoia = 'false';
      console.log('¡Rompecabezas resuelto correctamente!');
    } else{
      this.completed = false;
      console.log('El rompecabezas aún no está resuelto correctamente.');
    }
  }
  

  generatepuzzle(){
    for(let i = 0;i< this.pieces.length;i++){
      this.pieces[i].x = Math.random() * 150;
      this.pieces[i].y = Math.random() * 100;
    }
  }

  playAudio(audio : any){
    this.audio_active = audio
    audio.play()
  }

  audioGelditu(){
    this.audio_active.pause()
  }

  audioJarraitu(){
    this.audio_active.play()
  }

  audioakKargatu(){
    this.audio_1 = new Audio();
    this.audio_1.src = 'assets/audio/6Gunea/audio_puzzle_1.mp3';
    this.audio_1.load();

    this.audio_2 = new Audio();
    this.audio_2.src = 'assets/audio/6Gunea/audio_puzzle_2.mp3';
    this.audio_2.load();

    this.audio_1.addEventListener('ended', () => {//Bigarren audioa amaitzerakoan
      this.playAudio(this.audio_2);
    });
  }

  ngOnInit(){
    this.generatepuzzle();

    this.audioakKargatu()
    this.playAudio(this.audio_1)
  }
  mapaErakutsi(){
    this.mapa_visible = 'visible';
    this.panel_visible = 'visible';
  }

  hurrengoJokoa(ruta:any){
    this.audio_active.pause()//Audio reproduzitzen ari bada gelditu
    this.route.navigate([ruta]);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordenatu-argazkiak',
  templateUrl: './ordenatu-argazkiak.page.html',
  styleUrls: ['./ordenatu-argazkiak.page.scss'],
})
export class OrdenatuArgazkiakPage implements OnInit {

  images :string[] = ['../../assets/img/San-Anton1.jpg','../../assets/img/San-Anton2.jpg','../../assets/img/San-Anton3.jpg','../../assets/img/San-Anton4.jpg',];
   
  shuffledImages: string[];
  visibleImages: boolean[];
  clickedImages: string[] = [];
  correctOrder: string[];


  //AUDIO
  audio_1 : any;
  audio_active : any;

  //MAPA
   mapa_visible = 'hidden';
   mapa_botoia = 'false';
   panel_visible = 'hidden';

  constructor(private route: Router) { 
    this.correctOrder = [...this.images];
    this.shuffledImages = this.shuffleArray(this.images);
    this.visibleImages = Array(this.images.length).fill(true); // Inicialmente, todas las imágenes son visibles
  }
  shuffleImages() {
    // Implementa el algoritmo de mezcla aleatoria (Fisher-Yates) para reorganizar las imágenes
    for (let i = this.images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.images[i], this.images[j]] = [this.images[j], this.images[i]];
    }
  }
  shuffleArray(array: string[]): string[]{
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  
  }
  resetGame() {
    // Restablece todos los valores a su estado inicial
    this.clickedImages = [];
    this.visibleImages = Array(this.images.length).fill(true);
    this.shuffleImages();
  }
  onImageClick(index: number) {
    // Registra el orden de los clics
    

    // Verifica el orden
    const clickedImage = this.images[index];
    // Verifica si la imagen ya ha sido clicada o si el clic es correcto
    if (!this.clickedImages.includes(clickedImage) && clickedImage === this.correctOrder[this.clickedImages.length]) {
      // Marca la imagen como clicada
      this.clickedImages.push(clickedImage);

      // Borra la imagen
      this.visibleImages[index] = false;

      // Verifica si todas las imágenes han sido colocadas en el orden correcto
      if (this.clickedImages.length === this.correctOrder.length) {
        //alert('Zorionak jokoa amaitu duzu');
        this.mapa_botoia = 'false';
        
      }
    } else {
      alert('Hori ez zen argazki zuzena.Saiatu berriro.');
      this.resetGame();
      // Puedes realizar acciones adicionales si el clic no es correcto
    }
    
  }
  mapaErakutsi(){
    this.mapa_visible = 'visible';
    this.panel_visible = 'visible';
  }
  
  hurrengoJokoa(ruta:any){
    this.audio_active.pause()
    this.route.navigate([ruta]);
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
    this.audio_1.src = 'assets/audio/5Gunea/audio_5_gunea.mp3';
    this.audio_1.load();

  }

  ngOnInit() {
    this.audioakKargatu()
    this.playAudio(this.audio_1)
  }

}

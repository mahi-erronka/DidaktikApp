import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-test-galderak',
  templateUrl: 'test-galderak.page.html',
  styleUrls: ['test-galderak.page.scss'],
})
export class TestGalderakPage {
  juegoTerminado: boolean = false;
  juegoIniciado: boolean = false;
  mostrarRespuestas: boolean = false;

  //Audio
  private Audio3 = new Audio('assets/audio/1Gunea/Audio3.mp3');
  reproduciendoAudio: boolean = true; 

   //MAPA
   mapa_visible = 'hidden';
   mapa_botoia = 'false';
   panel_visible = 'hidden';
  preguntas: any[] = [
    {
      pregunta: 'Noiz izan zen Bilboko uholderik larriena?',
      respuestas: ['1988', '1983', '1883', '2001'],
      respuestaCorrecta: '1983',
      tiempo: 10, // Tiempo para esta pregunta en segundos
    },
    {
      pregunta: 'Bilboko itsasadarra, bi ibairen bokalea da, Nerbioi eta Ibaizabal. ',
      respuestas: ['Egia', 'Gezurra'] ,
      respuestaCorrecta: 'Egia',
      tiempo: 10,
    },
    {
      pregunta: ' Antzinan, ______________ garrantzitsua izan zen. ',
      respuestas: ['ibai', 'ekonomikoki', 'merkataritza-portu', 'hiri'], 
      respuestaCorrecta: 'merkataritza-portu',
      tiempo: 10,
    },
    {
      pregunta: '1983ko uholdearen ondorioz… ',
      respuestas: ['Itsasadarrari ez zitzaion ezer gertatu.', 'Bilboko itsasadarra pixka bat igo zen', 'Bilboko itsasadarra urik gabe geratu zen.', 'Bilboko itsasadarrak gainezka egin zuen hainbat eremutan.'], 
      respuestaCorrecta: 'Bilboko itsasadarrak gainezka egin zuen hainbat eremutan.',
      tiempo: 10,
    },
  
    // Agrega más preguntas según sea necesario
  ];
  preguntaActualIndex: number = 0; // Índice de la pregunta actual
  preguntaActual: any = {};
  tiempoRestante: number = 10;
  puntos: number = 0;
  
  interval: any;
  
  constructor(private route: Router) { this.playAudio(this.Audio3);}

  iniciarJuego() {
    this.juegoTerminado = false;
    this.juegoIniciado = true;
    this.shuffleArray(this.preguntas);
    this.siguientePregunta();
  }

  repetirIntento(): void {
    clearInterval(this.interval); // Limpiar el intervalo actual
    this.puntos = 0;
    this.juegoTerminado = false;
    this.juegoIniciado = true;
    this.preguntaActualIndex = 0;
    this.mostrarRespuestas = false;
    this.shuffleArray(this.preguntas);
    this.siguientePregunta();
  }

  hurrengoJokoa(ruta: any) {
    this.Audio3.pause();
  
    this.route.navigate([ruta]);
  }

    //Mapa erakusteko botoia aktibatzeko
    mapaErakutsi(){
      this.mapa_visible = 'visible';
      this.panel_visible = 'visible';
    }

  verificarRespuesta(respuestaSeleccionada: string) {
    clearInterval(this.interval);

    // Guardar la respuesta seleccionada para usarla en la presentación de colores
    this.preguntaActual.respuestaSeleccionada = respuestaSeleccionada;

    if (respuestaSeleccionada === this.preguntaActual.respuestaCorrecta) {
      this.preguntaActual.estado = 'correcta';
      this.puntos += 10;
    } else {
      this.preguntaActual.estado = 'incorrecta';
    }

    setTimeout(() => {
      this.preguntaActual.estado = undefined;
      this.siguientePregunta();
    }, 200);
  }

  contarTiempo() {
    this.interval = setInterval(() => {
      this.tiempoRestante--;

      if (this.tiempoRestante === 0) {
        clearInterval(this.interval);
        this.verificarRespuesta(''); // Llamada a la función de verificación con una respuesta vacía (tiempo agotado)
      }
    }, 1000);
  }

  siguientePregunta() {
    clearInterval(this.interval); // Limpiar el intervalo actual
    if (this.preguntaActualIndex < this.preguntas.length) {
      this.preguntaActual = this.preguntas[this.preguntaActualIndex];
      this.tiempoRestante = this.preguntaActual.tiempo;
      this.contarTiempo();
      this.preguntaActualIndex++;
    } else {
      // Fin del juego
      this.juegoTerminado = true;
    }
  }

  ngOnInit() {
    // El contador de tiempo se inicia cuando se inicia el componente
  }

  respuestaColor(respuesta: string) {
    if (this.preguntaActual.estado === 'incorrecta' && respuesta === this.preguntaActual.respuestaSeleccionada) {
      return 'danger'; // Color rojo para la respuesta incorrecta seleccionada
    } else if (this.preguntaActual.estado === 'correcta' && respuesta === this.preguntaActual.respuestaCorrecta) {
      return 'success'; // Color verde para la respuesta correcta
    } else {
      return 'primary'; // Color por defecto para otras respuestas
    }
  }
 
  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  // ... (métodos existentes)

  mostrarRespuestasCorrectas() {
    this.mostrarRespuestas = true;
  }

  playAudio(audio: HTMLAudioElement) {
    this.reproduciendoAudio = true; // Bloquear los botones cuando se inicie la reproducción del audio
    audio.play();
  }
}



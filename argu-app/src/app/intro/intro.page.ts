import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  // Audio
  private Audio1 = new Audio('assets/audio/0Gunea/Audio1.mp3');
  private Audio2 = new Audio('assets/audio/0Gunea/Audio2.mp3');

  dialogo: string = '';
  reproduciendoAudio: boolean = true; // Nueva propiedad para controlar la reproducción de audio

  constructor() {
    this.playAudio(this.Audio1);
    this.Audio1.addEventListener('ended', () => {
      // Comienza la reproducción del segundo audio
      this.playAudio(this.Audio2);
    });
    this.Audio2.addEventListener('ended', () => {
      // Ambos audios han terminado, desbloquear los botones
      this.reproduciendoAudio = false;
    });

    this.iniciarDialogo();
  }

  ngOnInit() {}

  respuesta(opcion: string) {
    if (!this.reproduciendoAudio) {
      console.log(`Seleccionaste: ${opcion}`);
      // Puedes agregar lógica adicional según tu necesidad
    } else {
      console.log('Espera a que termine el audio antes de seleccionar una opción.');
    }
  }

  iniciarDialogo() {
    let textoCompleto =
      "Kaixo Umeak! Zelan? \n\n Nire izena Argu da eta oso arrain nagusia naiz. Ni zuen bidaiaren " +
      "gidaria izango naiz. \n\n Ni 1983an jaio nintzen. Ba ahal daki inork zer gertatu zen 1983an?\n\n" +
      "Ondo da! Egingo dugun bidai magiko honetan, 1983an gertatutako uhoaldeari buruz hitz " +
      "egingo dugu eta horretarako gure hiriko zazpi kaleetatik ibiliko gara. Ibilbide honetan zehar " +
      "zazpi ondare garrantzitsu ikusiko ditugu, bertan ikusteko uholdeak izan zuen garrantzia eta " +
      "izandako kalteak.\n\n Eta zeintzuk dira zazpi ondare horiek?\n\n Sopa letra honetan ondareekin erlazio" +
      "estua duten hitzak aurkituko dituzue.\n\n Bilatu eta animo!";

    // Reemplazamos los saltos de línea por etiquetas <br>
    textoCompleto = textoCompleto.replace(/\n/g, '<br>');

    let index = 0;
    const interval = setInterval(() => {
      this.dialogo += textoCompleto[index];
      index++;
      if (index === textoCompleto.length) {
        clearInterval(interval);
      }
    }, 85);
  }

  playAudio(audio: HTMLAudioElement) {
    this.reproduciendoAudio = true; // Bloquear los botones cuando se inicie la reproducción del audio
    audio.play();
  }
 

  reiniciarAudio2() {
    
    this.playAudio(this.Audio2);
  }
}

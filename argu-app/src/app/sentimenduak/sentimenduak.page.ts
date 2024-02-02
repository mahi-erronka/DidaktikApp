import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sentimenduak',
  templateUrl: './sentimenduak.page.html',
  styleUrls: ['./sentimenduak.page.scss'],
})
export class SentimenduakPage implements OnInit {

  sentimenduak : string[] = ['Tristura','Beldurra','Zoriontasuna','Larritasuna','Urduritasuna','Harridura','Nazka','Asperdura','Maitemindua'];
  ausazko_sentimendua = "";

  audio_antzerki_1 : any;
  audio_antzerki_2 : any;
  audio_azalpena : any
  audio_active : any;

  //MAPA
  mapa_visible = 'hidden';
  mapa_botoia = 'false';
  panel_visible = 'hidden';

  //TESTUA
  dialogo : any;

  constructor(private route: Router) { }

  sentimenduaAukeratu(){
    var index = Math.floor(Math.random() * this.sentimenduak.length);

    return this.sentimenduak[index];
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
    this.audio_antzerki_1 = new Audio();
    this.audio_antzerki_1.src = 'assets/audio/3Gunea/audio_antzerki_1.mp3';
    this.audio_antzerki_1.load();

    this.audio_antzerki_2 = new Audio();
    this.audio_antzerki_2.src = 'assets/audio/3Gunea/audio_antzerki_2.mp3';
    this.audio_antzerki_2.load();

    this.audio_azalpena = new Audio();
    this.audio_azalpena.src = 'assets/audio/3Gunea/antzerki_azalpena.mp3';
    this.audio_azalpena.load();

    this.audio_antzerki_1.addEventListener('ended', () => {//Lehenengo audioa amaitzerakoan
      this.playAudio(this.audio_antzerki_2);
    });

    this.audio_antzerki_2.addEventListener('ended', () => {//Bigarren audioa amaitzerakoan
      this.playAudio(this.audio_azalpena);
    });

    this.audio_azalpena.addEventListener('ended', () => {//Bigarren audioa amaitzerakoan
      this.mapa_botoia = 'false';
    });
  }

  //Mapa erakusteko botoia aktibatzeko
  mapaErakutsi(){
    this.mapa_visible = 'visible';
    this.panel_visible = 'visible';
  }

  hurrengoJokoa(ruta:any){
    this.audio_active.pause()//Audio reproduzitzen ari bada gelditu
    this.route.navigate([ruta]);
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



  ngOnInit() {
    this.ausazko_sentimendua = this.sentimenduaAukeratu();

    this.audioakKargatu()
    this.playAudio(this.audio_antzerki_1)

    this.iniciarDialogo()
  }

}

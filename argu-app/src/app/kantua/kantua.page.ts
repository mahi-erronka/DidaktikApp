import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-kantua',
  templateUrl: './kantua.page.html',
  styleUrls: ['./kantua.page.scss'],
})
export class KantuaPage implements OnInit {
  media: any;
  erantzunak : string[] = ['gauekoa','Abuztuan','katuak','Marijaia','gazte','andre','Zapia','dantzetan','erlojua','zoratu','barriro','Aste Nagusira','Marijaia','Aste Nagusira','Marijaia']
  // Initialize the array with a specific size and empty objects
  sartutakoak: { value: string, color: string, disabled: string }[] = Array.from({ length: 15 }, () => ({} as { value: string, color: string, disabled: string }));
  asmatutakoak = 0
  constructor(private route: Router) {}

  checkBotoia = 'false'//Erantzunak konprobatzeko botoia aktibatu eta desaktibatzeko
  //AUDIO
  audio_1 : any;
  audio_2 : any;
  audio_3 : any;
  audio_kantua : any;
  audio_active : any;

  //MAPA
  mapa_visible = 'hidden';
  mapa_botoia = 'false';
  panel_visible = 'hidden';

  erantzunakKonprobatu(){
    for(let i = 0;i < this.erantzunak.length;i++){
      if(this.sartutakoak[i].value != null && this.erantzunak[i].toLocaleLowerCase() == this.sartutakoak[i].value.toLocaleLowerCase()){
        console.log("Erantzuna " + i + ": ZUZENA");
        this.sartutakoak[i].color = '#83ff61';
        this.sartutakoak[i].disabled = 'true';
        this.asmatutakoak += 1;
      }else{
        console.log("Erantzuna " + i + ": OKERRA");
        this.sartutakoak[i].color = '#ff6b61';
      }
      
      if(this.asmatutakoak >= 15){//Guztiak asmatzerakoan maparen botoia aktibatu
        this.mapa_botoia = 'false'
      }
    }

    this.mapa_botoia = 'false'//Mapa erakusteko botoia aktibatu
  }

  //Botoiak desaktibatu audioak amaitu arte
  botoiakDesaktibatu(){
    for(let i = 0;i < this.sartutakoak.length;i++){
      this.sartutakoak[i].disabled = 'true';
      this.sartutakoak[i].color = '#e6e6e6';
    }
  }

  //Botoiak aktibatu kantua hasterakoan
  botoiakAktibatu(){
    for(let i = 0;i < this.sartutakoak.length;i++){
      this.sartutakoak[i].disabled = 'false';
    }
    this.checkBotoia = 'false';//Erantzunak egiaztatzeko botoia aktibatu
  }

  //AUDIO
  audioakKargatu(){
    this.audio_1 = new Audio();
    this.audio_1.src = 'assets/audio/2Gunea/audio_kantua_1.mp3';
    this.audio_1.load();

    this.audio_2 = new Audio();
    this.audio_2.src = 'assets/audio/2Gunea/audio_kantua_2.mp3';
    this.audio_2.load();

    this.audio_3 = new Audio();
    this.audio_3.src = 'assets/audio/2Gunea/audio_kantua_3.mp3';
    this.audio_3.load();

    this.audio_kantua = new Audio();
    this.audio_kantua.src = 'assets/audio/2Gunea/marijaia_dator.mp3';
    this.audio_kantua.load();

    this.audio_1.addEventListener('ended', () => {//Lehenengo audioa amaitzerakoan
      this.playAudio(this.audio_2);
    });

    this.audio_2.addEventListener('ended', () => {//Bigarren audioa amaitzerakoan
      this.playAudio(this.audio_3);
    });

    this.audio_3.addEventListener('ended', () => {//Hirugarren audioa amaitzerakoan
      this.playAudio(this.audio_kantua);
      this.botoiakAktibatu()
      this.audio_active = this.audio_kantua//Kantua berriro entzun ahal izateko
    });

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

  mapaErakutsi(){
    this.mapa_visible = 'visible';
    this.panel_visible = 'visible';
  }

  hurrengoJokoa(ruta:any){
    this.audio_active.pause()//Audio reproduzitzen ari bada gelditu
    this.route.navigate([ruta]);
  }


  ngOnInit() {
    this.audioakKargatu()
    this.playAudio(this.audio_1)
    this.botoiakDesaktibatu()
  }

  
}
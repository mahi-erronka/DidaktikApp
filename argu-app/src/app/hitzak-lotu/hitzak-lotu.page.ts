import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hitzak-lotu',
  templateUrl: './hitzak-lotu.page.html',
  styleUrls: ['./hitzak-lotu.page.scss'],
})
export class HitzakLotuPage implements OnInit {

  hitzak = [{value:'Arraindegia',color:'#d8e246',disabled:'false'},{value:'Okindegia',color:'#d8e246',disabled:'false'},
  {value:'Harategia',color:'#d8e246',disabled:'false'},{value:'Fruta-denda',color:'#d8e246',disabled:'false'}]
  aukeratutakoHitza : string = '';

  zenbakiak =[{value:'202',color:'#d8e246',disabled:'false'},{value:'213',color:'#d8e246',disabled:'false'},
  {value:'215',color:'#d8e246',disabled:'false'},{value:'217',color:'#d8e246',disabled:'false'}]
  aukeratutakoZenbakia : string = '';

  asmatutakoak = 0;

  //AUDIO
  audio_1 : any;
  audio_2 : any;
  audio_active : any;

  //MAPA
  mapa_visible = 'hidden';
  mapa_botoia = 'false';
  panel_visible = 'hidden';

  constructor(private route: Router) { }

  HitzakEtaZenbakiakOrdenatu(){
    const randomSort = () => Math.random() - 0.5;
    
    this.hitzak.sort(randomSort);
    this.zenbakiak.sort(randomSort)
  }

  HitzaAukeratu(item: any){
    this.hitzak.forEach(button => {
      if(button.disabled == "false"){
        button.color = '#d8e246';
      }
    });

    item.color = '#bbbbbb';
    this.aukeratutakoHitza = item.value;
    console.log(this.aukeratutakoHitza);
    this.EmaitzaKonprobatu()
  }

  ZenbakiaAukeratu(item: any){
    this.zenbakiak.forEach(button => {
      if(button.disabled == "false"){
        button.color = '#d8e246';
      }
    });

    item.color = '#bbbbbb';
    this.aukeratutakoZenbakia = item.value;
    console.log(this.aukeratutakoZenbakia);
    this.EmaitzaKonprobatu()
  }

  ResetZenbakiak(){
    this.aukeratutakoZenbakia = "";
    this.zenbakiak.forEach(button => {
      if(button.disabled == "false"){
        button.color = '#d8e246';
      }
    });
  }

  ResetHitzak(){
    this.aukeratutakoHitza = "";
    this.hitzak.forEach(button => {
      if(button.disabled == "false"){
        button.color = '#d8e246';
      }
    });
  }

  EmaitzaKonprobatu(){
    //Asmatzen badu
    if((this.aukeratutakoHitza == "Arraindegia" && this.aukeratutakoZenbakia == "202") || (this.aukeratutakoHitza == "Okindegia" && this.aukeratutakoZenbakia == "217") || (this.aukeratutakoHitza == "Harategia" && this.aukeratutakoZenbakia == "213") || (this.aukeratutakoHitza == "Fruta-denda" && this.aukeratutakoZenbakia == "215")){
      //Hitza desaktibatu
      for(let i = 0;i < this.hitzak.length;i++){
        if (this.hitzak[i].value == this.aukeratutakoHitza){
          this.hitzak[i].color = '#43af23';
          this.hitzak[i].disabled = 'true';
        }
      }
      //Zenbakia desaktibatu
      for(let i = 0;i < this.zenbakiak.length;i++){
        if (this.zenbakiak[i].value == this.aukeratutakoZenbakia){
          this.zenbakiak[i].color = '#43af23';
          this.zenbakiak[i].disabled = 'true';
        }
      }

      this.aukeratutakoHitza = "";
      this.aukeratutakoZenbakia = "";

      this.asmatutakoak += 1;
      if (this.asmatutakoak == 4){
        //Hurrengora joateko botoia erakutsi
        this.mapa_botoia = 'false'//Mapa erakusteko botoia aktibatu
      }
    }else if (this.aukeratutakoHitza != "" && this.aukeratutakoZenbakia != ""){//Ez badu asmatzen
      this.ResetHitzak();
      this.ResetZenbakiak();
    }
  }

  //Mapa erakusteko botoia aktibatzeko
  mapaErakutsi(){
    this.mapa_visible = 'visible';
    this.panel_visible = 'visible';
  }

  //Botoiak desaktibatu audioak amaitu arte
  botoiakDesaktibatu(){
    for(let i = 0;i < this.hitzak.length;i++){
      this.hitzak[i].disabled = 'true';
      this.zenbakiak[i].disabled = 'true';
    }
  }

  //Audioak amaitzerakoan botoi guztiak aktibatzeko
  botoiakAktibatu(){
    for(let i = 0;i < this.hitzak.length;i++){
      this.hitzak[i].disabled = 'false';
      this.zenbakiak[i].disabled = 'false';
    }
  }

  //AUDIO
  audioakKargatu(){
    this.audio_1 = new Audio();
    this.audio_1.src = 'assets/audio/4Gunea/audio_hlotu_1.mp3';
    this.audio_1.load();

    this.audio_2 = new Audio();
    this.audio_2.src = 'assets/audio/4Gunea/audio_hlotu_2.mp3';
    this.audio_2.load();

    this.audio_1.addEventListener('ended', () => {//Lehenengo audioa amaitzerakoan
      this.playAudio(this.audio_2);
    });

    this.audio_2.addEventListener('ended', () => {//Lehenengo audioa amaitzerakoan
      this.botoiakAktibatu()
      this.audio_active = this.audio_1//Reset audioak
      console.log("Audioak amaituta");
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

  hurrengoJokoa(ruta:any){
    this.audio_active.pause()//Audio reproduzitzen ari bada gelditu
    this.route.navigate([ruta]);
  }

  ngOnInit() {
    this.HitzakEtaZenbakiakOrdenatu()
    this.botoiakDesaktibatu()
    this.audioakKargatu()
    this.playAudio(this.audio_1)

    
  }

}

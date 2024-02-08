import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-amaiera',
  templateUrl: './amaiera.page.html',
  styleUrls: ['./amaiera.page.scss'],
})
export class AmaieraPage implements OnInit {

  audio_1 : any
  puntuazioa = '10'

  constructor(private http: HttpClient) { }

  partida_gorde(){
    const apiUrl = 'http://192.168.73.8:80/api/partidak';
    const requestBody = { id: 1,erabiltzailea_id: 1,puntuazioa: this.puntuazioa};

        this.http.post(apiUrl,requestBody).subscribe(
          (response) => {

          },
          (error) => {
            // Handle error
            console.error('Error datuak gordetzerakoan', error);

          }
        );
  }

  ngOnInit() {
    this.partida_gorde()


    this.audio_1 = new Audio();
    this.audio_1.src = 'assets/audio/Amaiera/Amaierako-audioa.mp3';
    this.audio_1.load();
    this.audio_1.play();
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-amaiera',
  templateUrl: './amaiera.page.html',
  styleUrls: ['./amaiera.page.scss'],
})
export class AmaieraPage implements OnInit {
  audio_1: any;
  puntuazioa: string = '0'; // Inicializar puntuazioa
  erabiltzaileId: string = ''; // Inicializar erabiltzaileId

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {}

  partida_gorde() {
    const apiUrl = 'http://192.168.73.8:80/api/partidak';
    const requestBody = {
      erabiltzailea_id: this.erabiltzaileId,
      puntuazioa: this.puntuazioa,
    };

    this.http.post(apiUrl, requestBody).subscribe(
      (response) => {
        // Manejar la respuesta del servidor aquí
        console.log('Partida guardada:', response);
      },
      (error) => {
        // Manejar el error aquí
        console.error('Error al guardar partida:', error);
      }
    );
  }

  ngOnInit() {
    // Obtener el ID del usuario y la puntuación de los parámetros de la ruta
    this.activatedRoute.params.subscribe((newParams) => {
      console.log('Params: ', newParams);
      this.erabiltzaileId = newParams['id']; // Obtener 'id' de los parámetros de la ruta
      this.puntuazioa = newParams['puntuazioa']; // Obtener 'puntuazioa' de los parámetros de la ruta
      this.partida_gorde(); // Llamar al método para guardar la partida después de obtener los datos
    });

    // Reproducir audio
    this.audio_1 = new Audio();
    this.audio_1.src = 'assets/audio/Amaiera/Amaierako-audioa.mp3';
    this.audio_1.load();
    this.audio_1.play();
  }
}

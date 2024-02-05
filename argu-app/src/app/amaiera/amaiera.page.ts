import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-amaiera',
  templateUrl: './amaiera.page.html',
  styleUrls: ['./amaiera.page.scss'],
})
export class AmaieraPage implements OnInit {

  audio_1 : any

  constructor() { }

  ngOnInit() {
    this.audio_1 = new Audio();
    this.audio_1.src = 'assets/audio/Amaiera/Amaierako-audioa.mp3';
    this.audio_1.load();
    this.audio_1.play();
  }

}

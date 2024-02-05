import { Component, ElementRef, HostListener } from '@angular/core';
import { Haptics } from '@capacitor/haptics';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private Audio1 = new Audio('assets/audio/Home/fondo1.mp3');
  private Audio2 = new Audio('assets/audio/Home/rain.mp3');
  private Audio3 = new Audio('assets/audio/Home/door.mp3');

  private volumeStep = 0.1;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.playAudio(this.Audio1, 0.2);
    this.playAudio(this.Audio2, 1);
  }

  reproduciendoAudio: boolean = true;

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    const mareaContainer = this.el.nativeElement.querySelector('.marea-container');
    const currentTop = parseInt(window.getComputedStyle(mareaContainer).top, 13);
    const newTop = currentTop + 10;
    mareaContainer.style.top = `${newTop}px`;

    this.reduceVolume(this.Audio2);
  }

  async pushButton() {
    this.playAudio(this.Audio3, 1);
  
    await Haptics.vibrate({ duration: 10 });
    await new Promise(resolve => setTimeout(resolve, 50));
    await Haptics.vibrate({ duration: 10 });
    
    this.stopAllAudio();
  }

  playAudio(audio: HTMLAudioElement, volume: number) {
    this.reproduciendoAudio = true;
    audio.volume = volume;
    audio.play();
  }

  reduceVolume(audio: HTMLAudioElement) {
    if (audio.volume >= this.volumeStep) {
      audio.volume -= this.volumeStep;
    } else {
      audio.volume = 0;
      audio.pause();
      audio.currentTime = 0;
      this.reproduciendoAudio = false;
    }
  }

  stopAllAudio() {
    this.Audio1.pause();
    this.Audio1.currentTime = 0;
    this.Audio2.pause();
    this.Audio2.currentTime = 0;
    this.reproduciendoAudio = false;
  }
}

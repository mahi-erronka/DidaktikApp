import { Component, ElementRef, HostListener } from '@angular/core';
import { Haptics } from '@capacitor/haptics';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  username:any;
  password:any;


  private Audio1 = new Audio('assets/audio/Home/fondo1.mp3');
  private Audio2 = new Audio('assets/audio/Home/rain.mp3');
  private Audio3 = new Audio('assets/audio/Home/door.mp3');

  private volumeStep = 0.1;

  constructor(private el: ElementRef,private http: HttpClient,private route: Router) {}

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
  login(username:any,password:any) {
    const apiUrl = 'http://192.168.73.8:80/api/erabiltzaileak';
    const requestBody = { izena: this.username, pasahitza: this.password };


    
    this.http.get(apiUrl).subscribe(
      (response) => {
        // Handle successful response
        //console.log('Data fetched successfully', response);
        var res = JSON.stringify(response);

        // Parse the JSON response
        const dataArray = JSON.parse(res);


        // Access the first element of the array
        if (dataArray.length > 0) {
          for(let i = 0;i < dataArray.length;i++){
            if(dataArray[i].izena == this.username && dataArray[i].pasahitza == this.password){
              this.route.navigate(['/intro', { id: dataArray[i].id, izena: dataArray[i].izena, pasahitza: dataArray[i].pasahitza, emaila: dataArray[i].emaila, puntuazioa:0}]);
            }
          }
        } else {
          console.error("Array is empty");
        }
      },
      (error) => {
        // Handle error
        console.error('Error fetching data', error);
        console.error('User: ' + this.username + ",Password: " + this.password)
      }
    );
  }
}

import { Component,ElementRef,HostListener } from '@angular/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    // Obtener la posición actual del gif
    const mareaContainer = this.el.nativeElement.querySelector('.marea-container');
    const currentTop = parseInt(window.getComputedStyle(mareaContainer).top, 10);

    // Ajustar la posición del gif (puedes ajustar estos valores según tus necesidades)
    const newTop = currentTop + 10;

    // Aplicar la nueva posición al contenedor del gif
    mareaContainer.style.top = `${newTop}px`;
  }

  async pushButton() {
   
    await Haptics.vibrate({duration: 10});
    await new Promise(resolve => setTimeout(resolve, 50));
    await Haptics.vibrate({duration: 10});
  }
}

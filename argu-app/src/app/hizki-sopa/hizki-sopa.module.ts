// hizki-sopa.module.ts

import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Agrega esta importación
import { HizkiSopaComponent } from './hizki-sopa.component';

@NgModule({
  declarations: [HizkiSopaComponent],
  imports: [CommonModule, IonicModule], // Asegúrate de agregar CommonModule aquí
  exports: [HizkiSopaComponent],
})
export class HizkiSopaModule {}

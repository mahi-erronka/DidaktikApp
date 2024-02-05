import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HizkiSopaPageRoutingModule } from './hizki-sopa-routing.module';

import { HizkiSopaPage } from './hizki-sopa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HizkiSopaPageRoutingModule
  ],
  declarations: [HizkiSopaPage]
})
export class HizkiSopaPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KantuaPageRoutingModule } from './kantua-routing.module';

import { KantuaPage } from './kantua.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KantuaPageRoutingModule
  ],
  declarations: [KantuaPage]
})
export class KantuaPageModule {}

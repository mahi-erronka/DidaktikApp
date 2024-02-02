import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuzzleaPageRoutingModule } from './puzzlea-routing.module';

import { PuzzleaPage } from './puzzlea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuzzleaPageRoutingModule
  ],
  declarations: [PuzzleaPage]
})
export class PuzzleaPageModule {}

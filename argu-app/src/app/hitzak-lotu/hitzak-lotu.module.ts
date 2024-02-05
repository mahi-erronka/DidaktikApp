import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HitzakLotuPageRoutingModule } from './hitzak-lotu-routing.module';

import { HitzakLotuPage } from './hitzak-lotu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HitzakLotuPageRoutingModule
  ],
  declarations: [HitzakLotuPage]
})
export class HitzakLotuPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SentimenduakPageRoutingModule } from './sentimenduak-routing.module';

import { SentimenduakPage } from './sentimenduak.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SentimenduakPageRoutingModule
  ],
  declarations: [SentimenduakPage]
})
export class SentimenduakPageModule {}

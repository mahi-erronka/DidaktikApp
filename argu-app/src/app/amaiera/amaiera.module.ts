import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmaieraPageRoutingModule } from './amaiera-routing.module';

import { AmaieraPage } from './amaiera.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmaieraPageRoutingModule
  ],
  declarations: [AmaieraPage]
})
export class AmaieraPageModule {}

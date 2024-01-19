import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenatuArgazkiakPageRoutingModule } from './ordenatu-argazkiak-routing.module';

import { OrdenatuArgazkiakPage } from './ordenatu-argazkiak.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenatuArgazkiakPageRoutingModule
  ],
  declarations: [OrdenatuArgazkiakPage]
})
export class OrdenatuArgazkiakPageModule {}

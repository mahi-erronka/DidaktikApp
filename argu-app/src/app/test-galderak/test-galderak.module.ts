import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestGalderakPageRoutingModule } from './test-galderak-routing.module';

import { TestGalderakPage } from './test-galderak.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestGalderakPageRoutingModule
  ],
  declarations: [TestGalderakPage]
})
export class TestGalderakPageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HizkiSopaPage } from './hizki-sopa.page';

const routes: Routes = [
  {
    path: '',
    component: HizkiSopaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HizkiSopaPageRoutingModule {}

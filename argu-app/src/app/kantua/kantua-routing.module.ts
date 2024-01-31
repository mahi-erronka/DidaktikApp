import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KantuaPage } from './kantua.page';

const routes: Routes = [
  {
    path: '',
    component: KantuaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KantuaPageRoutingModule {}

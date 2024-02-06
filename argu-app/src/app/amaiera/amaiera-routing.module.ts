import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmaieraPage } from './amaiera.page';

const routes: Routes = [
  {
    path: '',
    component: AmaieraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmaieraPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SentimenduakPage } from './sentimenduak.page';

const routes: Routes = [
  {
    path: '',
    component: SentimenduakPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SentimenduakPageRoutingModule {}

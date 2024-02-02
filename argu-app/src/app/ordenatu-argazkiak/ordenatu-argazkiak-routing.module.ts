import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenatuArgazkiakPage } from './ordenatu-argazkiak.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenatuArgazkiakPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenatuArgazkiakPageRoutingModule {}

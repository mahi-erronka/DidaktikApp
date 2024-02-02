import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestGalderakPage } from './test-galderak.page';

const routes: Routes = [
  {
    path: '',
    component: TestGalderakPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestGalderakPageRoutingModule {}

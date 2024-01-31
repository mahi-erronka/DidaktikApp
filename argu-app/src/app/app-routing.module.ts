import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'kantua',
    loadChildren: () => import('./kantua/kantua.module').then( m => m.KantuaPageModule)
  },
  {
    path: 'hitzak-lotu',
    loadChildren: () => import('./hitzak-lotu/hitzak-lotu.module').then( m => m.HitzakLotuPageModule)
  },
  {
    path: 'sentimenduak',
    loadChildren: () => import('./sentimenduak/sentimenduak.module').then( m => m.SentimenduakPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

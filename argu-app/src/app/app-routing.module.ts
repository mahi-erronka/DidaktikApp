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
    path: 'intro',
    loadChildren: () => import('./intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'hizki-sopa',
    loadChildren: () => import('./hizki-sopa/hizki-sopa.module').then( m => m.HizkiSopaPageModule)
  },
  {
    path: 'test-galderak',
    loadChildren: () => import('./test-galderak/test-galderak.module').then( m => m.TestGalderakPageModule)
  },
  {
    path: 'kantua',
    loadChildren: () => import('./kantua/kantua.module').then( m => m.KantuaPageModule)
  },
  {
    path: 'sentimenduak',
    loadChildren: () => import('./sentimenduak/sentimenduak.module').then( m => m.SentimenduakPageModule)
  },
  {
    path: 'hitzak-lotu',
    loadChildren: () => import('./hitzak-lotu/hitzak-lotu.module').then( m => m.HitzakLotuPageModule)
  },
  {
    path: 'ordenatu-argazkiak',
    loadChildren: () => import('./ordenatu-argazkiak/ordenatu-argazkiak.module').then( m => m.OrdenatuArgazkiakPageModule)
  },
  {
    path: 'puzzlea',
    loadChildren: () => import('./puzzlea/puzzlea.module').then( m => m.PuzzleaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

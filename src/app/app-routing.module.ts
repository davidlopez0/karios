import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateGuardIsNot } from './auth/guards/is-not-authenticated.guard';
import { canActivateGuard } from './auth/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: 'karios',
    loadChildren: () => import('./karios/karios.module').then(m => m.KariosModule),
    canActivate: [ canActivateGuardIsNot ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [ canActivateGuard ],
  },
  {
    path: '**',
    redirectTo: 'auth',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NologinGuard } from './guards/nologin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',canActivate : [AuthGuard] ,
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'park',canActivate : [AuthGuard] ,
    loadChildren: () => import('./park/park.module').then( m => m.ParkPageModule)
  },
  {
    path: 'login',canActivate : [NologinGuard] ,
    loadChildren: () => import('./componentes/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',canActivate : [NologinGuard] ,
    loadChildren: () => import('./componentes/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'biositios',
    loadChildren: () => import('./pages/biositios/biositios.module').then( m => m.BiositiosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

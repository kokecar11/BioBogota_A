import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiositiosPage } from './biositios.page';

const routes: Routes = [
  {
    path: '',
    component: BiositiosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiositiosPageRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiositiosPageRoutingModule } from './biositios-routing.module';

import { BiositiosPage } from './biositios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BiositiosPageRoutingModule
  ],
  declarations: [BiositiosPage]
})
export class BiositiosPageModule {}

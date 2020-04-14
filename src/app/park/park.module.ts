import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParkPageRoutingModule } from './park-routing.module';

import { ParkPage } from './park.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParkPageRoutingModule
  ],
  declarations: [ParkPage]
})
export class ParkPageModule {}

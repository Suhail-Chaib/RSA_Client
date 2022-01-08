import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivatesWordsPageRoutingModule } from './privates-words-routing.module';

import { PrivatesWordsPage } from './privates-words.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivatesWordsPageRoutingModule
  ],
  declarations: [PrivatesWordsPage]
})
export class PrivatesWordsPageModule {}

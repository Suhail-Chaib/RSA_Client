import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivatesWordsPage } from './privates-words.page';

const routes: Routes = [
  {
    path: '',
    component: PrivatesWordsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivatesWordsPageRoutingModule {}

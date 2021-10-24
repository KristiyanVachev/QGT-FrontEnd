import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QuestionGenerationComponent} from './question-generation/question-generation.component'

const routes: Routes = [
  { path: 'generate', component: QuestionGenerationComponent },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

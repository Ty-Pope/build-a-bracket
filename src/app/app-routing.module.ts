import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BracketTypeComponent } from './bracket-type/bracket-type.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FaqComponent } from './faq/faq.component';
import { MyBracketsComponent } from './my-brackets/my-brackets.component';
import { CreateBracketComponent } from './create-bracket/create-bracket.component';
import { NoPageComponent } from './no-page/no-page.component';

const routes: Routes = [
 { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
 { path: 'dashboard', component: DashboardComponent },
 { path: 'faq', component: FaqComponent },
 { path: 'my-brackets', component: MyBracketsComponent},
 { path: 'create-bracket', component: CreateBracketComponent},
 { path: 'bracket-type', component: BracketTypeComponent},
 { path: '**', component: NoPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
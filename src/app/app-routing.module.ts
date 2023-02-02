import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FaqComponent } from './faq/faq.component';
import { MyBracketsComponent } from './my-brackets/my-brackets.component';
const routes: Routes = [
 { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
 { path: 'dashboard', component: DashboardComponent },
 { path: 'faq', component: FaqComponent },
 { path: 'brackets', component: MyBracketsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
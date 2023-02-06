import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FaqComponent } from './faq/faq.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyBracketsComponent } from './my-brackets/my-brackets.component';
import { MessagesComponent } from './messages/messages.component';
import { BracketTypeComponent } from './bracket-type/bracket-type.component';

@NgModule({
  declarations: [
    AppComponent,
    FaqComponent,
    DashboardComponent,
    MyBracketsComponent,
    MessagesComponent,
    BracketTypeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

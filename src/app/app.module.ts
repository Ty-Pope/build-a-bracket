import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FaqComponent } from './faq/faq.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyBracketsComponent } from './my-brackets/my-brackets.component';
import { MessagesComponent } from './messages/messages.component';
import { BracketTypeComponent } from './bracket-type/bracket-type.component';
import { CreateBracketComponent } from './create-bracket/create-bracket.component';
import { NoPageComponent } from './no-page/no-page.component';
import { BracketEditComponent } from './bracket-edit/bracket-edit.component';


@NgModule({
 declarations: [
  AppComponent,
  FaqComponent,
  DashboardComponent,
  MyBracketsComponent,
  MessagesComponent,
  BracketTypeComponent,
  CreateBracketComponent,
  NoPageComponent,
  BracketEditComponent,
 ],
 imports: [BrowserModule, AppRoutingModule, FormsModule],
 providers: [],
 bootstrap: [AppComponent],
})
export class AppModule { }

import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
  { path: '', component: LoginComponent, data: { bodyClass: 'sfondo' } },
  { path: 'home', component: HomeComponent, data: { bodyClass: 'white' }},
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InputTextModule,
    CheckboxModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    CardModule,
    DialogModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }

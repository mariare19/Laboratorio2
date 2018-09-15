import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PrincipalComponent } from './principal/principal.component';
import { ListadoRecetasComponent } from './listado-recetas/listado-recetas.component';
import { ModalAnimationComponent } from './modal-animation/modal-animation.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    ListadoRecetasComponent,
    ModalAnimationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

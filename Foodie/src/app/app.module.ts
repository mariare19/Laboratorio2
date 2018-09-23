import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PrincipalComponent } from './principal/principal.component';
import { ListadoRecetasComponent } from './listado-recetas/listado-recetas.component';
import { RecetaComponent } from './receta/receta.component';
import { RecetaService } from './servicios/receta.service';
import { AccionRecetaComponent } from './accion-receta/accion-receta.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    ListadoRecetasComponent,
    RecetaComponent,
    AccionRecetaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    RecetaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

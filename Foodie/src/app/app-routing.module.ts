import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { ListadoRecetasComponent } from './listado-recetas/listado-recetas.component';
import { AccionRecetaComponent } from './accion-receta/accion-receta.component';

const routes: Routes = [
	{ path: '', redirectTo: 'principal', pathMatch: 'full' },
	{ path: 'principal', component: PrincipalComponent },
	{ path: 'recetas', component: ListadoRecetasComponent },
	{ path: 'crear', component: AccionRecetaComponent },
	{ path: 'editar/:id', component: AccionRecetaComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
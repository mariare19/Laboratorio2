import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { ListadoRecetasComponent } from './listado-recetas/listado-recetas.component';

const routes: Routes = [
    { path: '', redirectTo: 'principal', pathMatch: 'full' },
	{ path: 'principal', component: PrincipalComponent },
	{ path: 'recetas', component: ListadoRecetasComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
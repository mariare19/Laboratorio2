import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { RecetaClass } from '../Modelo/receta';
import Swal from 'sweetalert2';
import { RecetaService } from '../servicios/receta.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-listado-recetas',
	templateUrl: './listado-recetas.component.html',
	styleUrls: ['./listado-recetas.component.css']
})
export class ListadoRecetasComponent implements OnInit {

	diccRecetas: any = {};
	keyRecetas: any;
	receta: RecetaClass;
	sizeDicc: number = 0;
	constructor(private recetaService: RecetaService, private router: Router) { }

	ngOnInit() {
		this.diccRecetas = this.recetaService.getRecetas();
		this.keyRecetas = Object.keys(this.diccRecetas);
		this.sizeDicc = this.keyRecetas.length;
	}

	borrarReceta(keyReceta) {
		Swal({
			title: 'Borrar',
			text: 'Seguro que desea borrar esta receta?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonText: "Si, seguro!",
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33'
		}).then((result) => {
			if (result.value != "" && !result.dismiss) {
				this.recetaService.BorrarReceta(keyReceta);
				this.updateInfo();
				Swal({
					type: 'success',
					title: 'Se borro la receta!'
				});
			}
		}).catch(Swal.noop);
	}

	Editar(keyReceta) {
		this.router.navigate(['/editar/' + keyReceta]);
	}

	nuevaReceta() {
		this.router.navigate(['/crear']);
	}

	updateInfo() {
		this.diccRecetas = this.recetaService.getRecetas();
		this.keyRecetas = Object.keys(this.diccRecetas);
		this.sizeDicc = this.keyRecetas.length;
	}
}

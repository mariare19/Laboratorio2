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
	keyRecetas: any = [];
	receta: RecetaClass;
	constructor(private recetaService: RecetaService, private router: Router) { }

	ngOnInit() {
		this.updateInfo();
	}

	borrarReceta(keyReceta) {
		Swal({
			title: 'Borrar',
			text: 'Seguro que desea borrar esta receta?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonText: "Sí",
			cancelButtonText: 'Cancelar',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33'
		}).then((result) => {
			if (result.value != "" && !result.dismiss) {
				this.recetaService.BorrarReceta(keyReceta['_id']).then(response => {
					if (response.status == 204) {
						this.updateInfo();
						Swal({
							type: 'success',
							title: 'Se borro la receta!'
						});
					} else {
						Swal({
							type: 'error',
							title: 'No se pudo borrar la receta.'
						});
					}
				}).catch(error => {
					Swal({
						type: 'error',
						title: 'Hubo un error.',
						text: error
					});
				});
			}
		}).catch(Swal.noop);
	}

	Editar(keyReceta) {
		this.router.navigate(['/editar/' + keyReceta['_id']]);
	}

	nuevaReceta() {
		this.router.navigate(['/crear']);
	}

	updateInfo() {
		this.recetaService.getRecetas().then(response => {
			if (response.status == 200) {
				response.json().then(data => {
					this.keyRecetas = data;
				})
			} else {
				this.keyRecetas = [];
			}
		}).catch(error => {
			Swal({
				type: 'error',
				title: 'Hubo un error.',
				text: error
			});
		});
	}
}

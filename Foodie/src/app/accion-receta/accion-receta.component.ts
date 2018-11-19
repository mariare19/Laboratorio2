import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RecetaClass } from '../Modelo/receta';
import { RecetaService } from '../servicios/receta.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-accion-receta',
	templateUrl: './accion-receta.component.html',
	styleUrls: ['./accion-receta.component.css']
})
export class AccionRecetaComponent implements OnInit {
	keyReceta: any = '';
	receta: RecetaClass;
	@Output() formValues = new EventEmitter();
	form: FormGroup;
	constructor(private formBuilder: FormBuilder, private recetaService: RecetaService, private router: Router,
		private route: ActivatedRoute) {
		this.form = this.formBuilder.group({
			Titulo: ['', Validators.required],
			Descripcion: ['', Validators.required],
			Ingredientes: [[], Validators.required],
			Dificultad: ['', Validators.required],
			Porciones: ['', Validators.required]
		});
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			if (Object.keys(params).length > 0) {
				this.keyReceta = params.id;
			} else {
				this.keyReceta = '';
			}
		});
		if (this.keyReceta != '') {
			this.recetaService.getReceta(this.keyReceta).then(response => {
				response.json().then(data => {
					this.receta = data[0];
					this.form = this.formBuilder.group({
						Titulo: [this.receta.titulo, Validators.required],
						Descripcion: [this.receta.descripcion, Validators.required],
						Ingredientes: [this.receta.ingredientes, Validators.required],
						Dificultad: [this.receta.dificultad, Validators.required],
						Porciones: [this.receta.porciones, Validators.required]
					});
				})
			}).catch(error => {
				Swal({
					type: 'error',
					title: 'Hubo un error.',
					text: error
				});
			});
		} else {
			this.form = this.formBuilder.group({
				Titulo: ['', Validators.required],
				Descripcion: ['', Validators.required],
				Ingredientes: [[], Validators.required],
				Dificultad: ['', Validators.required],
				Porciones: ['', Validators.required]
			});
		}
	}

	Guardar(formValues) {
		let receta: RecetaClass = new RecetaClass(
			formValues['Titulo'],
			formValues['Descripcion'],
			formValues['Ingredientes'],
			formValues['Dificultad'],
			formValues['Porciones']
		);

		if (this.keyReceta != '') {
			this.recetaService.EditarReceta(this.keyReceta, receta).then(response => {
				if (response.status == 204) {
					this.router.navigate(['/recetas']);
				} else {
					Swal({
						type: 'error',
						title: 'No se actualizo la receta!'
					});
				}
			}).catch(error => {
				Swal({
					type: 'error',
					title: 'Hubo un error.',
					text: error
				});
			});
		} else {
			this.recetaService.NuevaReceta(receta).then(response => {
				if (response.status == 201) {
					this.router.navigate(['/recetas']);
				} else {
					Swal({
						type: 'error',
						title: 'No se creo la receta!'
					});
				}
			}).catch(error => {
				Swal({
					type: 'error',
					title: 'Hubo un error',
					text: error
				});
			});
		}
	}

	regresar() {
		this.router.navigate(['/recetas']);
	}
}

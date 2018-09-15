import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { RecetaClass } from '../Modelo/receta';

@Component({
	selector: 'app-listado-recetas',
	templateUrl: './listado-recetas.component.html',
	styleUrls: ['./listado-recetas.component.css']
})
export class ListadoRecetasComponent implements OnInit {

	tipo: any = 'Nueva';;
	arrayRecetas: RecetaClass[] = [];
	form: FormGroup;
	receta: RecetaClass;
	constructor(private formBuilder: FormBuilder) {
		if (localStorage.getItem('arrayRecetas')) {
			this.arrayRecetas = JSON.parse(localStorage.getItem('arrayRecetas'));
		} else {
			localStorage.setItem('arrayRecetas', JSON.stringify(this.arrayRecetas));
		}
	}

	ngOnInit() {
		this.form = this.formBuilder.group({
			Titulo: ['', Validators.required],
			Descripcion: ['', Validators.required],
			Ingredientes: ['', Validators.required],
			Dificultad: ['', Validators.required],
			Porciones: ['', Validators.required]
		})
	}

	showModal(tipo, i) {
		this.tipo = tipo;
		if (tipo == 'Nueva') {
			this.form.reset();
		} else {
			this.arrayRecetas = JSON.parse(localStorage.getItem('arrayRecetas'));
			let receta = this.arrayRecetas[i];
			this.form.controls['Titulo'].setValue(receta.titulo);
			this.form.controls['Descripcion'].setValue(receta.descripcion);
			let ingredientes = '';
			receta.ingredientes.forEach(ingrediente => {
				ingredientes = ingrediente + ',' + ingredientes;
			})
			ingredientes = ingredientes.substring(0, ingredientes.length - 1);
			this.form.controls['Ingredientes'].setValue(ingredientes);
			this.form.controls['Dificultad'].setValue(receta.dificultad);
			this.form.controls['Porciones'].setValue(receta.porciones);
			this.form['id'] = i;
		}
		document.querySelector('#modalRecetas').classList.add('md-show');
	}

	closeModal() {
		document.querySelector('#modalRecetas').classList.remove('md-show');
	}

	borrarReceta(i) {
		this.arrayRecetas = JSON.parse(localStorage.getItem('arrayRecetas'));
		this.arrayRecetas.splice(i, 1);
		localStorage.setItem('arrayRecetas', JSON.stringify(this.arrayRecetas));
	}

	Guardar(formValues, tipo) {
		let receta: RecetaClass = new RecetaClass();
		receta.titulo = formValues.value['Titulo'];
		receta.descripcion = formValues.value['Descripcion'];
		let ingredientes = [];
		ingredientes = formValues.value['Ingredientes'].split(',');
		receta.ingredientes = ingredientes;
		receta.dificultad = formValues.value['Dificultad'];
		receta.porciones = formValues.value['Porciones'];
		this.arrayRecetas = JSON.parse(localStorage.getItem('arrayRecetas'));
		if (tipo == 'Nueva') {
			this.arrayRecetas.push(receta);
		} else {
			Object.assign(this.arrayRecetas[this.form['id']], receta);
		}
		localStorage.setItem('arrayRecetas', JSON.stringify(this.arrayRecetas));
		this.closeModal();
	}
}

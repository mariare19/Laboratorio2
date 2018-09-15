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
		localStorage.setItem('arrayRecetas', JSON.stringify(this.arrayRecetas));
	}

	ngOnInit() {
		this.form = this.formBuilder.group({
			Titulo: ['', Validators.required],
			Descripcion: ['', Validators.required],
			Ingredientes: ['', Validators.required],
			Dificultad: ['', Validators.required],
			Porciones: ['', Validators.required]
		})

		// this.arrayRecetas = [
		// 	{
		// 		id: '1',
		// 		titulo: 'Brownies de Nutella',
		// 		descripcion: 'Este brownie de Nutella es facilísimo de preparar, con muy pocos ingredientes, aunque puedes personalizarlo a tu gusto.',
		// 		ingredientes: [
		// 			'Chocolate',
		// 			'Huevo',
		// 			'Harina',
		// 			'Mantequilla'
		// 		],
		// 		urlimg: "assets/images/brownies.jpg"
		// 	},
		// 	{
		// 		id: '2',
		// 		titulo: 'Crema de Queso y Cereza',
		// 		descripcion: 'Bonitas capas de migas de galleta Graham, sabroso relleno y relleno de fruta hacen que estos postres de queso crema sean un destacado!',
		// 		ingredientes: [
		// 			'Azucar',
		// 			'Mantequilla',
		// 			'Harina',
		// 			'Leche Condensada'
		// 		],
		// 		urlimg: "assets/images/fresas.jpg"
		// 	},
		// 	{
		// 		id: '3',
		// 		titulo: 'Tim Tam Shooters',
		// 		descripcion: '¡Sorprenda a sus invitados con estos magníficos tiradores de postres Tim Tam, hechos con espuma de chocolate y crema batida de Tim Tam!',
		// 		ingredientes: [
		// 			'Azucar',
		// 			'Mantequilla',
		// 			'Harina',
		// 			'Leche Condensada'
		// 		],
		// 		urlimg: "assets/images/chocolate2.jpg"
		// 	}
		// ]
	}

	showModal(tipo, receta: RecetaClass) {
		this.tipo = tipo;
		if (tipo == 'Nueva') {
			this.form.reset();
		} else {
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
			this.receta = receta;
		}
		document.querySelector('#modalRecetas').classList.add('md-show');
	}

	closeModal() {
		document.querySelector('#modalRecetas').classList.remove('md-show');
	}

	borrarReceta() {
		this.arrayRecetas = JSON.parse(localStorage.getItem('arrayRecetas'));
	}

	Guardar(formValues, tipo, receta: RecetaClass = new RecetaClass()) {
		receta.titulo = formValues['Titulo'];
		receta.descripcion = formValues['Descripcion'];
		let ingredientes = [];
		ingredientes = formValues['Ingredientes'].split(',');
		receta.ingredientes = ingredientes;
		receta.dificultad = formValues['Dificultad'];
		receta.porciones = formValues['Porciones'];
		this.arrayRecetas = JSON.parse(localStorage.getItem('arrayRecetas'));
		if (tipo == 'Nueva') {
			receta.id = this.arrayRecetas.length;
			this.arrayRecetas.push(receta);
		} else {
			for (let i = 0; i < this.arrayRecetas.length; i++) {
				let element = this.arrayRecetas[i];
				if (element.id == receta.id) {
					Object.assign(element, receta);
				}
			}
		}
		localStorage.setItem('arrayRecetas', JSON.stringify(this.arrayRecetas));
		this.closeModal();
	}
}

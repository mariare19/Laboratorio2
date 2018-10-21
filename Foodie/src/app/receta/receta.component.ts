import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RecetaClass } from '../Modelo/receta';
import { RecetaService } from '../servicios/receta.service';

@Component({
	selector: 'app-receta',
	templateUrl: './receta.component.html',
	styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

	@Input() keyReceta: RecetaClass;
	receta: RecetaClass;
	@Output() borrar = new EventEmitter();
	@Output() editar = new EventEmitter();
	constructor(private recetaService: RecetaService) { }

	ngOnInit() {
		this.receta = this.keyReceta;
	}

	borrarReceta(receta) {
		this.borrar.emit(receta);
	}

	editarReceta(receta) {
		this.editar.emit(receta);
	}

}

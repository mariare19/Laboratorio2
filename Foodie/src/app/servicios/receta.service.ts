import { Injectable } from '@angular/core';
import { RecetaClass } from '../Modelo/receta';
import { Guid } from "guid-typescript";

@Injectable()

export class RecetaService {

    private diccRecetas: any = {};

    constructor() { }

    NuevaReceta(receta: RecetaClass) {
        let string = 'key' + Guid.create();
        this.diccRecetas[string] = receta;
        localStorage.setItem('diccRecetas', JSON.stringify(this.diccRecetas));
    }

    EditarReceta(key, receta) {
        this.diccRecetas[key] = receta;
        localStorage.setItem('diccRecetas', JSON.stringify(this.diccRecetas));
    }

    BorrarReceta(key) {
        delete this.diccRecetas[key];
        localStorage.setItem('diccRecetas', JSON.stringify(this.diccRecetas));
    }

    getRecetas() {
        if (localStorage.getItem('diccRecetas')) {
            this.diccRecetas = JSON.parse(localStorage.getItem('diccRecetas'));
            return this.diccRecetas;
        } else {
            return {};
        }
    }

    getReceta(key) {
        this.diccRecetas = JSON.parse(localStorage.getItem('diccRecetas'));
        return this.diccRecetas[key];
    }
}

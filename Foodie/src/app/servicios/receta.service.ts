import { Injectable } from '@angular/core';
import { RecetaClass } from '../Modelo/receta';
import { Guid } from "guid-typescript";
import { environment } from '../../environments/environment';;

@Injectable()

export class RecetaService {

    private diccRecetas: any = {};

    constructor() { }

    NuevaReceta(receta: RecetaClass) {  
         let info = {
            method: 'POST',
            body: JSON.stringify(receta),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return fetch(`${environment.EndPoint}/create`, info);
    }

    EditarReceta(key, receta) {
        let info = {
            method: 'PUT',
            body: JSON.stringify(receta),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return fetch(`${environment.EndPoint}/update/${key}`, info);
    }

    BorrarReceta(key) {
        let info = {
            method: 'DELETE'
        };
        return fetch(`${environment.EndPoint}/delete/${key}`, info);
    }

    getRecetas() {
        return fetch(`${environment.EndPoint}/read`);
    }

    getReceta(key) {
        return fetch(`${environment.EndPoint}/read/${key}`);
    }
}

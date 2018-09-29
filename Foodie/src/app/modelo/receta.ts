export class RecetaClass {
    id: number;
    titulo: string;
    descripcion: string;
    ingredientes: string[];
    dificultad: string;
    porciones: number;
    urlimg: string;

    constructor(titulo?, descripcion?, ingredientes?, dificultad?, porciones?) {
        this.titulo = titulo || '';
        this.descripcion = descripcion || '';
        this.ingredientes = ingredientes || [];
        this.dificultad = dificultad || '';
        this.porciones = porciones || '';
        this.urlimg = 'assets/images/recipe.png';
    }
}
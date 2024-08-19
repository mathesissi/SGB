export class LivroDto {
    id: number;
    titulo: string;
    autor: string;
    categoriaId: number;

    constructor(id: number, titulo: string, autor: string, categoriaId: number) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.categoriaId = categoriaId;
    }

}
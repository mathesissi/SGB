export class CategoriaEntity {
    id: number;
    nome: string;

    constructor(id?: number, nome?: string) {
        this.id = id || 0;
        this.nome = nome || '';
    }
}
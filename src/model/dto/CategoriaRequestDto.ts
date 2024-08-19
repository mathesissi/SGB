export class CategoriaRequestDto {
    nome: string;

    constructor(nome?: string) {
        this.nome = nome || '';
    }
}
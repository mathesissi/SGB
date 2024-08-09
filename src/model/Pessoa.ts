export class Pessoa {
    id: number;
    nome: string;
    email: string;

    constructor(id?: number, nome?: string, email?: string) {
        this.id = id || 0;
        this.nome = nome || '';
        this.email = email || '';
    }
}
export class Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;

    constructor(id?: number, nome?: string, email?: string, senha?: string) {
        this.id = id || 0;
        this.nome = nome || '';
        this.email = email || '';
        this.senha = senha || '';
    }
}
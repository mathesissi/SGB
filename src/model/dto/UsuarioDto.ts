export class UsuarioDto {
    id: number;
    idPessoa: number;
    senha: string;

    constructor(id: number, idPessoa: number, senha: string) {
        this.id = id;
        this.idPessoa = idPessoa;
        this.senha = senha;
    }
}
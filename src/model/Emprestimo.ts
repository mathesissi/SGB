export class Emprestimo {
    id: number;
    livroId: number;
    usuarioId: number;
    dataEmprestimo: string;
    dataDevolucao: string;

    constructor(id?: number, livroId?: number, usuarioId?: number, dataEmprestimo?: string, dataDevolucao?: string) {
        this.id = id || 0;
        this.livroId = livroId || 0;
        this.usuarioId = usuarioId || 0;
        this.dataEmprestimo = dataEmprestimo || '';
        this.dataDevolucao = dataDevolucao || '';
    }
}
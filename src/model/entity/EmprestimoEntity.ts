import { stringParaData } from "../../util/DataUtil";
export class EmprestimoEntity {
    id: number;
    livroId: number;
    usuarioId: number;
    dataEmprestimo: Date;
    dataDevolucao: Date;

    constructor(id?: number, livroId?: number, usuarioId?: number, dataEmprestimo?: string, dataDevolucao?: string) {
        this.id = id || 0;
        this.livroId = livroId || 0;
        this.usuarioId = usuarioId || 0;
        this.dataEmprestimo = stringParaData(dataEmprestimo || '');
        this.dataDevolucao = stringParaData(dataDevolucao || '');
    }
}
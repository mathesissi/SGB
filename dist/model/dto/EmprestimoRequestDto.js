"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoRequestDto = void 0;
class EmprestimoRequestDto {
    constructor(livroId, usuarioId, dataEmprestimo, dataDevolucao) {
        this.livroId = livroId || 0;
        this.usuarioId = usuarioId || 0;
        this.dataEmprestimo = (dataEmprestimo || '');
        this.dataDevolucao = (dataDevolucao || '');
    }
}
exports.EmprestimoRequestDto = EmprestimoRequestDto;

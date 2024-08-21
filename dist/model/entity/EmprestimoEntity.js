"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoEntity = void 0;
const DataUtil_1 = require("../../util/DataUtil");
class EmprestimoEntity {
    constructor(id, livroId, usuarioId, dataEmprestimo, dataDevolucao) {
        this.id = id || 0;
        this.livroId = livroId || 0;
        this.usuarioId = usuarioId || 0;
        this.dataEmprestimo = (0, DataUtil_1.stringParaData)(dataEmprestimo || '');
        this.dataDevolucao = (0, DataUtil_1.stringParaData)(dataDevolucao || '');
    }
}
exports.EmprestimoEntity = EmprestimoEntity;

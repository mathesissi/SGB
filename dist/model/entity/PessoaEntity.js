"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PessoaEntity = void 0;
class PessoaEntity {
    constructor(id, nome, email) {
        this.id = id || 0;
        this.nome = nome || '';
        this.email = email || '';
    }
}
exports.PessoaEntity = PessoaEntity;

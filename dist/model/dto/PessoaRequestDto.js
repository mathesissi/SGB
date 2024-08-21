"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PessoaRequestDto = void 0;
class PessoaRequestDto {
    constructor(nome, email) {
        this.nome = nome || '';
        this.email = email || '';
    }
}
exports.PessoaRequestDto = PessoaRequestDto;

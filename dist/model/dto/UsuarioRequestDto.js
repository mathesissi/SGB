"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRequestDto = void 0;
class UsuarioRequestDto {
    constructor(idPessoa, senha) {
        this.idPessoa = idPessoa || 0;
        this.senha = senha || '';
    }
}
exports.UsuarioRequestDto = UsuarioRequestDto;

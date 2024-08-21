"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroRequestDto = void 0;
class LivroRequestDto {
    constructor(titulo, autor, categoriaId) {
        this.titulo = titulo || '';
        this.autor = autor || '';
        this.categoriaId = categoriaId || 0;
    }
}
exports.LivroRequestDto = LivroRequestDto;

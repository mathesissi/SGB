"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const LivroEntity_1 = require("../model/entity/LivroEntity");
const LivroRepository_1 = require("../repository/LivroRepository");
const CategoriaService_1 = require("./CategoriaService");
class LivroService {
    constructor() {
        this.livroRepository = LivroRepository_1.LivroRepository.getInstace();
        this.categoriaService = new CategoriaService_1.CategoriaService();
    }
    criarLivro(livroData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { titulo, autor, categoriaId } = livroData;
            if (typeof titulo !== 'string' || typeof autor !== 'string' || typeof categoriaId !== 'number') {
                throw new Error("Dados incorretos, verificar se é 'string' ou 'number'");
            }
            if (!titulo || !autor || !categoriaId) {
                throw new Error("É necesario inserir titulo, autor e categoriaId");
            }
            const verificarCategoria = yield this.categoriaService.listarCategoriaPorId(categoriaId);
            if (!verificarCategoria) {
                throw new Error("Essa categoria nao existe!!");
            }
            const novoLivro = this.livroRepository.insertLivro(new LivroEntity_1.LivroEntity(undefined, titulo, autor, categoriaId));
            console.log("Service - Insert ", novoLivro);
            return novoLivro;
        });
    }
    listarLivroPorId(livroData) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = livroData;
            const livro = yield this.livroRepository.filterById(livroData);
            console.log("Service - Filter ID ", livro);
            return livro;
        });
    }
    listarLivroPorTitulo(livroData) {
        return __awaiter(this, void 0, void 0, function* () {
            const titulo = livroData;
            const livro = yield this.livroRepository.filterById(livroData);
            console.log("Service - Filter Name ", livro);
            return livro;
        });
    }
    listarLivroPorAutor(livroData) {
        return __awaiter(this, void 0, void 0, function* () {
            const autor = livroData;
            const livros = this.livroRepository.filterByAutor(livroData);
            console.log("Service - Filter All ", livros);
            return livros;
        });
    }
    listarLivros() {
        return __awaiter(this, void 0, void 0, function* () {
            const livros = this.livroRepository.getAll();
            console.log("Service - Filter All ", livros);
            return livros;
        });
    }
    atualizarLivro(livroData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, titulo, autor, categoriaId } = livroData;
            const verificar = yield this.listarLivroPorId(id);
            if (!verificar) {
                throw new Error("Livro não localizado");
            }
            const livro = new LivroEntity_1.LivroEntity(id, titulo, autor, categoriaId);
            yield this.livroRepository.updateLivro(livroData);
            console.log("Service - Update ", livro);
            return livro;
        });
    }
    deletarLivro(livroData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, titulo, autor, categoriaId } = livroData;
            const usuario = new LivroEntity_1.LivroEntity(id, titulo, autor, categoriaId);
            yield this.livroRepository.deleteLivro(livroData);
            console.log("Service - Delete ", usuario);
            return usuario;
        });
    }
}
exports.LivroService = LivroService;

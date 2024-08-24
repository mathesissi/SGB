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
exports.CategoriaService = void 0;
const CategoriaEntity_1 = require("../model/entity/CategoriaEntity");
const CategoriaRepository_1 = require("../repository/CategoriaRepository");
class CategoriaService {
    constructor() {
        this.categoriaRepository = CategoriaRepository_1.CategoriaRepository.getInstace();
    }
    criarCategoria(categoriaData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome } = categoriaData;
            if (typeof nome !== 'string') {
                throw new Error("Dado incorreto, verificar se é 'string'");
            }
            if (!nome) {
                throw new Error("É necessario inserir um nome");
            }
            const verificarCategoria = yield this.categoriaRepository.filterByName(nome);
            if (verificarCategoria.length > 0) {
                throw new Error("Essa  categoria já está cadastrada");
            }
            const novaCategoria = this.categoriaRepository.insertCategoria(new CategoriaEntity_1.CategoriaEntity(undefined, nome));
            console.log("Service - Insert ", novaCategoria);
            return novaCategoria;
        });
    }
    listarCategoriaPorId(categoriaData) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = categoriaData;
            const categoria = yield this.categoriaRepository.filterById(categoriaData);
            if (categoria.length === 0) {
                throw new Error("Categoria não encontrada");
            }
            console.log("Service - Filter ID ");
            return categoria;
        });
    }
    listarCategoriaPorNome(categoriaData) {
        return __awaiter(this, void 0, void 0, function* () {
            const nome = categoriaData;
            const categoria = yield this.categoriaRepository.filterByName(categoriaData);
            if (categoria.length === 0) {
                throw new Error("Categoria não encontrada");
            }
            console.log("Service - Filter Nome ");
            return categoria;
        });
    }
    listarCategorias() {
        return __awaiter(this, void 0, void 0, function* () {
            const categorias = this.categoriaRepository.getAll();
            console.log("Service - Filter All ");
            return categorias;
        });
    }
    atualizarCategoria(categoriaData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nome } = categoriaData;
            const verificar = yield this.listarCategoriaPorId(id);
            if (!verificar) {
                throw new Error("Categoria não localizada");
            }
            const categoria = new CategoriaEntity_1.CategoriaEntity(id, nome);
            yield this.categoriaRepository.updateCategoria(categoriaData);
            console.log("Service - Update ");
            return categoria;
        });
    }
    deletarCategoria(categoriaData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nome } = categoriaData;
            const categoria = new CategoriaEntity_1.CategoriaEntity(id, nome);
            const verificarCategoria = yield this.listarCategoriaPorId(id);
            if (verificarCategoria.length === 0) {
                throw new Error("Categoria não existente");
            }
            yield this.categoriaRepository.deleteCategoria(categoriaData);
            console.log("Service - Delete ");
            return categoria;
        });
    }
}
exports.CategoriaService = CategoriaService;

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
exports.CategoriaRepository = void 0;
const mysql_1 = require("../database/mysql");
class CategoriaRepository {
    construtor() {
        this.createTable();
    }
    static getInstace() {
        if (!this.instance) {
            this.instance = new CategoriaRepository();
        }
        return this.instance;
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `CREATE TABLE IF NOT EXISTS biblioteca.categoria (
                        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                        nome VARCHAR(255) NOT NULL
                        )`;
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                console.log("Sucesso ao criar tabela Curso");
            }
            catch (err) {
                console.error('Error');
            }
        });
    }
    insertCategoria(categoria) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)("INSERT INTO biblioteca.categoria (nome) VALUES (?)", [categoria.id, categoria.nome]);
                console.log("Categoria criadao com sucesso: ", resultado.insertId);
                categoria.id = resultado.insertId;
                return new Promise((resolve) => {
                    resolve(categoria);
                });
            }
            catch (err) {
                console.error("Erro ao criar uma categoria: ", err);
                throw err;
            }
        });
    }
    filterById(categoria) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT * FROM biblioteca.categoria WHERE id = ? ";
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [categoria.id]);
                console.log("Categoria localizada com sucesso: ", resultado);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel localizar a categoria: ${categoria.id}`, err);
                throw err;
            }
        });
    }
    filterByName(categoria) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT * FROM biblioteca.categoria WHERE nome = ? ";
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [categoria.nome]);
                console.log("Categoria localizada com sucesso: ", resultado);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel localizar a categoria: ${categoria.nome}`, err);
                throw err;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM biblioteca.categoria";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel listar as categorias:  ${err}`);
                throw err;
            }
        });
    }
    updateCategoria(categoria) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "UPDATE biblioteca.categoria SET nome = ? WHERE id = ?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [categoria.id, categoria.nome]);
                console.log("Categoria atualizada com sucesso: ", categoria);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel atualizar a categoria de id: ${categoria.id}`, err);
                throw err;
            }
        });
    }
    deleteCategoria(categoria) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "DELETE FROM biblioteca.categoria WHERE id = ?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [categoria.id]);
                console.log("Categoria deletada com sucesso: ", categoria);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel deletar a categoria de id: ${categoria.id}`, err);
                throw err;
            }
        });
    }
}
exports.CategoriaRepository = CategoriaRepository;

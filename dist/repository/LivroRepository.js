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
exports.LivroRepository = void 0;
const mysql_1 = require("../database/mysql");
class LivroRepository {
    constructor() {
        this.createTable();
    }
    static getInstace() {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance;
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `CREATE TABLE IF NOT EXISTS sgb.livro (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        titulo VARCHAR(255) NOT NULL,
                        autor VARCHAR(255) NOT NULL,
                        categoriaId INT NOT NULL,
                        FOREiGN KEY (categoriaId) REFERENCES sgb.categoria(id)
                        )`;
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                console.log("Sucesso ao criar tabela Livro");
            }
            catch (err) {
                console.error('Error');
            }
        });
    }
    insertLivro(livro) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "INSERT INTO sgb.Livro (titulo, autor, categoriaId) VALUES (?, ?, ?)";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [livro.titulo, livro.autor, livro.categoriaId]);
                console.log("Livro cadastrado com sucesso: ", resultado.insertId);
                livro.id = resultado.insertId;
                return new Promise((resolve) => {
                    resolve(livro);
                });
            }
            catch (err) {
                console.error("Erro ao cadastrar o livro: ", err);
                throw err;
            }
        });
    }
    filterById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT * FROM sgb.livro WHERE id = ?";
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [id]);
                console.log("Livro localizado com sucesso: ", resultado);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel consultar o livro: ${id}`, err);
                throw err;
            }
        });
    }
    filterByTitulo(titulo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT * FROM sgb.livro WHERE titulo = ?";
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [titulo]);
                console.log("Livro localizado com sucesso: ", resultado);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel consultar o livro: ${titulo}`, err);
                throw err;
            }
        });
    }
    filterByAutor(autor) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT * FROM sgb.livro WHERE autor = ?";
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [autor]);
                console.log("Livros encontrados com sucesso: ", resultado);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel consultar o livro: ${autor}`, err);
                throw err;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM sgb.livro";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel listar os livross:  ${err}`);
                throw err;
            }
        });
    }
    updateLivro(livro) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "UPDATE sgb.livro SET autor = ?, titulo = ?, categoriaId = ? WHERE id = ?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [livro.autor, livro.titulo, livro.categoriaId, livro.id]);
                console.log("Livro atualizado com sucesso ");
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel atualizar livro`, err);
                throw err;
            }
        });
    }
    deleteLivro(livros) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "DELETE FROM sgb.livro WHERE id = ?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [livros.id]);
                console.log("Livro deletado com sucesso: ", livros);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel deletar o livro`, err);
                throw err;
            }
        });
    }
}
exports.LivroRepository = LivroRepository;

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
exports.EmprestimoRepository = void 0;
const mysql_1 = require("../database/mysql");
class EmprestimoRepository {
    constructor() {
        this.createTable();
    }
    static getInstace() {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `CREATE TABLE IF NOT EXISTS biblioteca.emprestimo(
                        id NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        livroId INT NOT NULL,
                        usuarioId INT NOT NULL,
                        dataEmpresotimo Date NOT NULL,
                        dataDevolucao Date NOT NULL,
                        FOREiGN KEY (livroId) REFERENCES biblioteca.livro(id),
                        FOREiGN KEY (usuarioID) REFERENCES biblioteca.usuario(id)
                        )`;
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                console.log("Sucesso ao criar tabela Emprestimo");
            }
            catch (err) {
                console.error('Error');
            }
        });
    }
    insertEmprestimo(emprestimo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)("INSERT INTO biblioteca.Emprestimo (livroID, usuarioId, dataEmprestimo, dataDevolucao) VALUES (?, ?, ?, ?)", [emprestimo.livroId, emprestimo.usuarioId, emprestimo.dataEmprestimo, emprestimo.dataDevolucao]);
                console.log("Emprestimo realizado com sucesso: ", resultado.insertId);
                emprestimo.id = resultado.insertId;
                return new Promise((resolve) => {
                    resolve(emprestimo);
                });
            }
            catch (err) {
                console.error("Erro ao realizar o emprestimo: ", err);
                throw err;
            }
        });
    }
    filterById(emprestimo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT * FROM biblioteca.emprestimo WHERE id = ? ";
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [emprestimo.id]);
                console.log("Emprestimo localizado com sucesso: ", resultado);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel consultar emprestimo de ID: ${emprestimo.id}`, err);
                throw err;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM biblioteca.emprestimo";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel listar os emprestimos:  ${err}`);
                throw err;
            }
        });
    }
    updateEmprestimo(emprestimo) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "UPDATE biblioteca.emprestimo SET dataDevolucao = ? WHERE id = ?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [emprestimo.dataDevolucao]);
                console.log("Emprestimo atualizado com sucesso ");
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel atualizar emprestimo`, err);
                throw err;
            }
        });
    }
    deleteEmprestimo(emprestimo) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "DELETE FROM biblioteca.emprestimo WHERE id = ?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [emprestimo.id]);
                console.log("Emprestimo deletado com sucesso: ", emprestimo);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel deletar o emprestimo de id: ${emprestimo.id}`, err);
                throw err;
            }
        });
    }
}
exports.EmprestimoRepository = EmprestimoRepository;

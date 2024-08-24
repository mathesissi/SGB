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
            const query = `CREATE TABLE IF NOT EXISTS sgb.emprestimo(
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        livroId INT NOT NULL,
                        usuarioId INT NOT NULL,
                        dataEmprestimo Date NOT NULL,
                        dataDevolucao Date NOT NULL,
                        FOREiGN KEY (livroId) REFERENCES sgb.livro(id),
                        FOREiGN KEY (usuarioID) REFERENCES sgb.usuario(id)
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
            const query = "INSERT INTO sgb.Emprestimo (livroID, usuarioId, dataEmprestimo, dataDevolucao) VALUES (?, ?, ?, ?)";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [emprestimo.livroId, emprestimo.usuarioId, emprestimo.dataEmprestimo, emprestimo.dataDevolucao]);
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
    filterById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT * FROM sgb.emprestimo WHERE id = ? ";
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [id]);
                console.log("Emprestimo localizado com sucesso: ", resultado);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel consultar emprestimo de ID: ${id}`, err);
                throw err;
            }
        });
    }
    filterByUsuario(idUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT * FROM sgb.emprestimo WHERE usuarioId = ? ";
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [idUsuario]);
                console.log("Emprestimo localizado com sucesso: ", resultado);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel consultar emprestimo por usuario de ID: ${idUsuario}`, err);
                throw err;
            }
        });
    }
    filterByLivro(idLivro) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT * FROM sgb.emprestimo WHERE livroId = ? ";
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [idLivro]);
                console.log("Emprestimo localizado com sucesso: ", resultado);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel consultar emprestimo por Livro de id: ${idLivro}`, err);
                throw err;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM sgb.emprestimo";
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
            const query = "UPDATE sgb.emprestimo SET dataDevolucao = ? WHERE id = ?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [emprestimo.dataDevolucao, emprestimo.id]);
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
            const query = "DELETE FROM sgb.emprestimo WHERE id = ?";
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

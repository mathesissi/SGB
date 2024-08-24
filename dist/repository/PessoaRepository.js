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
exports.PessoaRepository = void 0;
const mysql_1 = require("../database/mysql");
class PessoaRepository {
    constructor() {
        this.createTable();
    }
    static getInstace() {
        if (!this.instance) {
            this.instance = new PessoaRepository();
        }
        return this.instance;
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `CREATE TABLE IF NOT EXISTS sgb.pessoa (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        nome VARCHAR(255) NOT NULL,
                        email VARCHAR(255) NOT NULL
)`;
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                console.log("Sucesso ao criar tabela Pessoa", resultado);
            }
            catch (err) {
                console.error('Error');
            }
        });
    }
    insertPessoa(pessoa) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "INSERT INTO sgb.pessoa (nome, email) VALUES (?,?)";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [pessoa.nome, pessoa.email]);
                console.log("Pessoa inserida com sucesso: ", resultado.insertId);
                pessoa.id = resultado.insertId;
                return new Promise((resolve) => {
                    resolve(pessoa);
                });
            }
            catch (err) {
                console.error("Erro ao inserir pessoa: ", err);
                throw err;
            }
        });
    }
    filterById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM sgb.pessoa WHERE id = ? ";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [id]);
                console.log("Pessoa localizada com sucesso: ", resultado);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel localizar pessoa de ID: ${id}`, err);
                throw err;
            }
        });
    }
    filterByName(nome) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM sgb.pessoa WHERE nome = ? ";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [nome]);
                console.log("Pessoa localizada com sucesso: ", resultado);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel localizar pessoa com nome: ${nome}`, err);
                throw err;
            }
        });
    }
    filterByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM sgb.pessoa WHERE email = ? ";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [email]);
                console.log("Pessoa localizada com sucesso: ", resultado);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel localizar pessoa com email`, err);
                throw err;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM sgb.pessoa";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel listar as pessoas:  ${err}`);
                throw err;
            }
        });
    }
    updateEmail(pessoa) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "UPDATE sgb.pessoa SET email = ? WHERE id = ?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [pessoa.email, pessoa.id]);
                console.log("Email atualizado com sucesso: ", pessoa);
                return new Promise((resolve) => {
                    resolve(pessoa);
                });
            }
            catch (err) {
                console.error(`Não foi possivel atualizar o email`, err);
                throw err;
            }
        });
    }
    deletePessoa(pessoa) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "DELETE FROM sgb.pessoa WHERE email = ?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [pessoa.email]);
                console.log("Pessoa deletada com sucesso: ", pessoa);
                return new Promise((resolve) => {
                    resolve(pessoa);
                });
            }
            catch (err) {
                console.error(`Não foi possivel deletar a pessoa`, err);
                throw err;
            }
        });
    }
}
exports.PessoaRepository = PessoaRepository;

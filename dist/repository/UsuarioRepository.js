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
exports.UsuarioRepository = void 0;
const mysql_1 = require("../database/mysql");
class UsuarioRepository {
    constructor() {
        this.createTable();
    }
    static getInstace() {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `CREATE TABLE IF NOT EXISTS sgb.usuario(
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        idPessoa INT NOT NULL,
                        senha VARCHAR(200) NOT NULL,
                        FOREiGN KEY (idPessoa) REFERENCES sgb.pessoa(id)
                        )`;
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                console.log("Sucesso ao criar tabela Usuario");
            }
            catch (err) {
                console.error('Error');
            }
        });
    }
    insertUsuario(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "INSERT INTO sgb.usuario (idPessoa, senha) VALUES (?, ?)";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [usuario.idPessoa, usuario.senha]);
                console.log("Usuario inserido com sucesso: ", resultado.insertId);
                usuario.id = resultado.insertId;
                return new Promise((resolve) => {
                    resolve(usuario);
                });
            }
            catch (err) {
                console.error("Erro ao inserir usuario: ", err);
                throw err;
            }
        });
    }
    filterById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM sgb.usuario WHERE id = ? ";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [id]);
                console.log("Usuario localizado com sucesso: ", resultado);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel localizar usuario de ID: ${id}`, err);
                throw err;
            }
        });
    }
    filterByIdPessoa(idPessoa) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM sgb.usuario WHERE idPessoa = ? ";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [idPessoa]);
                console.log("Usuario localizado com sucesso: ", resultado);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel localizar usuario de ID: ${idPessoa}`, err);
                throw err;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM sgb.usuario";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel listar os usuarios:  ${err}`);
                throw err;
            }
        });
    }
    updateSenha(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "UPDATE sgb.usuario SET senha = ? WHERE id = ?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [usuario.senha, usuario.id]);
                console.log("Senha atualizada com sucesso ");
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel atualizar a senha`, err);
                throw err;
            }
        });
    }
    deleteUsuario(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "DELETE FROM sgb.usuario WHERE id = ? AND idPessoa =?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [usuario.id, usuario.idPessoa]);
                console.log("Usuario deletado com sucesso: ", usuario);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Não foi possivel deletar a usuario de id: ${usuario.id}`, err);
                throw err;
            }
        });
    }
}
exports.UsuarioRepository = UsuarioRepository;

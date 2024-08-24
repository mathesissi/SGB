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
exports.UsuarioService = void 0;
const UsuarioEntity_1 = require("../model/entity/UsuarioEntity");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const PessoaService_1 = require("./PessoaService");
class UsuarioService {
    constructor() {
        this.usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstace();
        this.pessoaService = new PessoaService_1.PessoaService();
    }
    criarUsuario(usuarioData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idPessoa, senha } = usuarioData;
            if (typeof idPessoa !== 'number' || typeof senha !== 'string') {
                throw new Error("Dados incorretos: Insira os dados em seus devidos formatos");
            }
            if (!idPessoa || !senha) {
                throw new Error("Dados incompletos: Verifique se todos os campos foram preechidos");
            }
            const verificarUsuario = yield this.usuarioRepository.filterByIdPessoa(idPessoa);
            if (verificarUsuario.length > 0) {
                throw new Error("Esse usuario já esxite");
            }
            const verificaPessoa = yield this.pessoaService.listarPessoaPorId(idPessoa);
            if (!verificaPessoa) {
                throw new Error("Está pessoa não está cadastrada");
            }
            const novoUsuario = this.usuarioRepository.insertUsuario(new UsuarioEntity_1.UsuarioEntity(undefined, idPessoa, senha));
            console.log("Service - Insert ", novoUsuario);
            return novoUsuario;
        });
    }
    listarUsuarioPorId(usuarioData) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = usuarioData;
            const usuario = yield this.usuarioRepository.filterById(usuarioData);
            if (usuario.length === 0) {
                throw new Error("Usuario não cadastrado");
            }
            console.log("Service - Filter ID ", usuario);
            return usuario;
        });
    }
    listarUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = this.usuarioRepository.getAll();
            console.log("Service - Filter All ", usuarios);
            return usuarios;
        });
    }
    atualizarUsuario(usuarioData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idPessoa, senha, id } = usuarioData;
            const verificar = yield this.listarUsuarioPorId(id);
            if (!verificar) {
                throw new Error("Usuario não localizado");
            }
            const usuario = new UsuarioEntity_1.UsuarioEntity(id, idPessoa, senha);
            yield this.usuarioRepository.updateSenha(usuarioData);
            console.log("Service - Update ", usuario);
            return usuario;
        });
    }
    deletarUsuario(usuarioData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, idPessoa } = usuarioData;
            const usuario = new UsuarioEntity_1.UsuarioEntity(id, idPessoa);
            const verificarUsuario = yield this.listarUsuarioPorId(id);
            if (verificarUsuario.length === 0) {
                throw new Error("Usuario não localizado");
            }
            yield this.usuarioRepository.deleteUsuario(usuarioData);
            console.log("Service - Delete ", usuario);
            return usuario;
        });
    }
}
exports.UsuarioService = UsuarioService;

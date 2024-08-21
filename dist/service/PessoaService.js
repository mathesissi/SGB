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
exports.PessoaService = void 0;
const PessoaEntity_1 = require("../model/entity/PessoaEntity");
const PessoaRepository_1 = require("../repository/PessoaRepository");
class PessoaService {
    constructor() {
        this.pessoaRepository = PessoaRepository_1.PessoaRepository.getInstace();
    }
    criarPessoa(pessoaData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, email } = pessoaData;
            if (typeof nome !== 'string' || typeof email !== 'string') {
                throw new Error("Dados incorretos, verificar se é 'string'");
            }
            if (!nome || !email) {
                throw new Error("É necesario inserir um nome e um email");
            }
            const verificarPessoa = yield this.pessoaRepository.filterByName(pessoaData);
            const novaPessoa = this.pessoaRepository.insertPessoa(new PessoaEntity_1.PessoaEntity(undefined, nome));
            console.log("Service - Insert ", novaPessoa);
            return novaPessoa;
        });
    }
    listarPessoaPorId(pessoaData) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = pessoaData;
            const pessoa = yield this.pessoaRepository.filterById(pessoaData);
            console.log("Service - Filter ID ");
            return pessoa;
        });
    }
    listarPessoaPorNome(pessoaData) {
        return __awaiter(this, void 0, void 0, function* () {
            const nome = pessoaData;
            const pessoa = yield this.pessoaRepository.filterByName(pessoaData);
            console.log("Service - Filter Nome ");
            return pessoa;
        });
    }
    listarPessoaPorEmail(pessoaData) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = pessoaData;
            const pessoa = yield this.pessoaRepository.filterByEmail(pessoaData);
            console.log("Service - Filter Email ");
            return pessoa;
        });
    }
    listarPessoas() {
        return __awaiter(this, void 0, void 0, function* () {
            const pessoas = this.pessoaRepository.getAll();
            console.log("Service - Filter All ");
            return pessoas;
        });
    }
    atualizarEmail(pessoaData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nome, email } = pessoaData;
            const verificar = yield this.listarPessoaPorId(id);
            if (!verificar) {
                throw new Error("Pessoa não localizada");
            }
            const pessoa = new PessoaEntity_1.PessoaEntity(id, nome);
            yield this.pessoaRepository.updateEmail(pessoaData);
            console.log("Service - Update ");
            return pessoa;
        });
    }
    deletarPessoa(pessoaData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, nome, email } = pessoaData;
            const pessoa = new PessoaEntity_1.PessoaEntity(id, nome, email);
            yield this.pessoaRepository.deletePessoa(pessoaData);
            console.log("Service - Delete ");
            return pessoa;
        });
    }
}
exports.PessoaService = PessoaService;

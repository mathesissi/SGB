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
exports.EmprestimoService = void 0;
const EmprestimoEntity_1 = require("../model/entity/EmprestimoEntity");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const UsuarioService_1 = require("./UsuarioService");
const LivroService_1 = require("./LivroService");
class EmprestimoService {
    constructor() {
        this.emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstace();
        this.usuarioService = new UsuarioService_1.UsuarioService();
        this.livroService = new LivroService_1.LivroService();
    }
    criarEmprestimo(emprestimoData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { livroId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;
            if (typeof livroId !== 'number' || typeof usuarioId !== 'number' || typeof dataEmprestimo !== 'string' || typeof dataDevolucao !== 'string') {
                throw new Error("Dados incorretos: Insira os dados em seus devidos formatos");
            }
            if (!livroId || !usuarioId || !dataEmprestimo || !dataDevolucao) {
                throw new Error("Dados incompletos: Verifique se todos os campos foram preechidos");
            }
            const verificarEBU = yield this.emprestimoRepository.filterByUsuario(usuarioId);
            const verificarEBL = yield this.emprestimoRepository.filterByLivro(livroId);
            if (verificarEBL.length > 0 && verificarEBU.length > 0) {
                throw new Error("Já existe um emprestimo com esse livro e usuario");
            }
            const verificarUsuario = yield this.usuarioService.listarUsuarioPorId(usuarioId);
            if (!verificarUsuario) {
                throw new Error("Usuario não cadastrado");
            }
            const verificarLivro = yield this.livroService.listarLivroPorId(livroId);
            if (!verificarLivro) {
                throw new Error("Livro não registrado");
            }
            const novoEmprestimo = this.emprestimoRepository.insertEmprestimo(new EmprestimoEntity_1.EmprestimoEntity(undefined, livroId, usuarioId, dataEmprestimo, dataDevolucao));
            console.log("Service - Insert ", novoEmprestimo);
            return novoEmprestimo;
        });
    }
    listarEmprestimo(emprestimoData) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = emprestimoData;
            const emprestimo = yield this.emprestimoRepository.filterById(emprestimoData);
            if (emprestimo.length === 0) {
                throw new Error("Empréstimo não registrado");
            }
            console.log("Service - Filter ID ", emprestimo);
            return emprestimo;
        });
    }
    listarEmprestimos() {
        return __awaiter(this, void 0, void 0, function* () {
            const emprestimos = this.emprestimoRepository.getAll();
            console.log("Service - Filter All ", emprestimos);
            return emprestimos;
        });
    }
    // async listarEmprestimoByUsuario(emprestimoData: any): Promise<EmprestimoEntity[]> {
    //     const idUsuario: number = emprestimoData;
    //     const emprestimos = this.emprestimoRepository.filterByUsuario(emprestimoData);
    //     console.log("Service - Filter Usuario ", emprestimos);
    //     return emprestimos;
    // }
    atualizarEmprestimo(emprestimoData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, livroId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;
            const verificar = yield this.listarEmprestimo(id);
            if (!verificar) {
                throw new Error("Emprestimo não localizado");
            }
            const emprestimo = new EmprestimoEntity_1.EmprestimoEntity(id, livroId, usuarioId, dataEmprestimo, dataDevolucao);
            yield this.emprestimoRepository.updateEmprestimo(emprestimoData);
            console.log("Service - Update ", emprestimo);
            return emprestimo;
        });
    }
    deletarEmprestimo(emprestimoData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, livroId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;
            ;
            const emprestimo = new EmprestimoEntity_1.EmprestimoEntity(id, livroId, usuarioId, dataEmprestimo, dataDevolucao);
            const verificarEmpréstimo = yield this.listarEmprestimo(id);
            if (verificarEmpréstimo.length === 0) {
                throw new Error("Empréstimo não localizado");
            }
            yield this.emprestimoRepository.deleteEmprestimo(emprestimoData);
            console.log("Service - Delete ", emprestimo);
            return emprestimo;
        });
    }
}
exports.EmprestimoService = EmprestimoService;

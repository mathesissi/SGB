import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { UsuarioService } from "./UsuarioService";
import { LivroService } from "./LivroService";
export class EmprestimoService {
    emprestimoRepository = EmprestimoRepository.getInstace();
    usuarioService: UsuarioService = new UsuarioService();
    livroService: LivroService = new LivroService();

    async criarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> {
        const { livroId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;
        if (typeof livroId !== 'number' || typeof usuarioId !== 'number' || typeof dataEmprestimo !== 'string' || typeof dataDevolucao !== 'string') {
            throw new Error("Dados incorretos, verificar se é 'string'");
        }
        if (!livroId || !usuarioId || !dataEmprestimo || !dataDevolucao) {
            throw new Error("É necesario inserir livroId, usuarioId, dataEmprestimo e dataDevolucao");
        }
        const verificarUsuario = await this.usuarioService.listarUsuarioPorId(usuarioId);
        if (!verificarUsuario) {
            throw new Error("Esse usuario nao esxite!!");
        }
        const verificaLivro = await this.livroService.listarLivroPorId(livroId);
        if (!verificaLivro) {
            throw new Error("Não existe um livro com esse id");
        }
        const novoEmprestimo = this.emprestimoRepository.insertEmprestimo(new EmprestimoEntity(undefined, livroId, usuarioId, dataEmprestimo, dataDevolucao));
        console.log("Service - Insert ", novoEmprestimo);
        return novoEmprestimo;
    }

    async listarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> {
        const id: number = emprestimoData;
        const emprestimo = await this.emprestimoRepository.filterById(emprestimoData);
        console.log("Service - Filter ID ", emprestimo);
        return emprestimo;
    }

    async listarEmprestimos(): Promise<EmprestimoEntity[]> {
        const emprestimos = this.emprestimoRepository.getAll();
        console.log("Service - Filter All ", emprestimos);
        return emprestimos;
    }

    async atualizarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> {
        const { id, livroId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;
        const verificar = await this.listarEmprestimo(emprestimoData);
        if (!verificar) {
            throw new Error("Emprestimo não localizado");
        }
        const emprestimo = new EmprestimoEntity(id, livroId, usuarioId, dataEmprestimo, dataDevolucao);
        await this.emprestimoRepository.updateEmprestimo(emprestimoData);
        console.log("Service - Update ", emprestimo);
        return emprestimo;
    }

    async deletarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> {
        const { id, livroId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;;
        const emprestimo = new EmprestimoEntity(id, livroId, usuarioId, dataEmprestimo, dataDevolucao)
        await this.emprestimoRepository.deleteEmprestimo(emprestimoData);
        console.log("Service - Delete ", emprestimo);
        return emprestimo;
    }
}
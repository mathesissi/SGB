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
            throw new Error("Dados incorretos: Insira os dados em seus devidos formatos");
        }
        if (!livroId || !usuarioId || !dataEmprestimo || !dataDevolucao) {
            throw new Error("Dados incompletos: Verifique se todos os campos foram preechidos");
        }
        const verificarEBU = await this.emprestimoRepository.filterByUsuario(usuarioId);
        const verificarEBL = await this.emprestimoRepository.filterByLivro(livroId);
        if (verificarEBL.length > 0 && verificarEBU.length > 0) {
            throw new Error("Já existe um emprestimo com esse livro e usuario");
        }
        const verificarUsuario = await this.usuarioService.listarUsuarioPorId(usuarioId);
        if (!verificarUsuario) {
            throw new Error("Usuario não cadastrado");
        }
        const verificarLivro = await this.livroService.listarLivroPorId(livroId);
        if (!verificarLivro) {
            throw new Error("Livro não registrado");
        }
        const novoEmprestimo = this.emprestimoRepository.insertEmprestimo(new EmprestimoEntity(undefined, livroId, usuarioId, dataEmprestimo, dataDevolucao));
        console.log("Service - Insert ", novoEmprestimo);
        return novoEmprestimo;
    }

    async listarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity[]> {
        const id: number = emprestimoData;
        const emprestimo = await this.emprestimoRepository.filterById(emprestimoData);
        if (emprestimo.length === 0) {
            throw new Error("Empréstimo não registrado");
        }
        console.log("Service - Filter ID ", emprestimo);
        return emprestimo;
    }

    async listarEmprestimos(): Promise<EmprestimoEntity[]> {
        const emprestimos = this.emprestimoRepository.getAll();
        console.log("Service - Filter All ", emprestimos);
        return emprestimos;
    }

    // async listarEmprestimoByUsuario(emprestimoData: any): Promise<EmprestimoEntity[]> {
    //     const idUsuario: number = emprestimoData;
    //     const emprestimos = this.emprestimoRepository.filterByUsuario(emprestimoData);
    //     console.log("Service - Filter Usuario ", emprestimos);
    //     return emprestimos;
    // }

    async atualizarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> {
        const { id, livroId, usuarioId, dataEmprestimo, dataDevolucao } = emprestimoData;
        const verificar = await this.listarEmprestimo(id);
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
        const verificarEmpréstimo = await this.listarEmprestimo(id);
        if (verificarEmpréstimo.length === 0) {
            throw new Error("Empréstimo não localizado");

        }
        await this.emprestimoRepository.deleteEmprestimo(emprestimoData);
        console.log("Service - Delete ", emprestimo);
        return emprestimo;
    }
}
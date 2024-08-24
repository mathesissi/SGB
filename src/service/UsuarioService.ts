import { UsuarioEntity } from "../model/entity/UsuarioEntity";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { PessoaService } from "./PessoaService";

export class UsuarioService {
    usuarioRepository = UsuarioRepository.getInstace();
    pessoaService: PessoaService = new PessoaService();

    async criarUsuario(usuarioData: any): Promise<UsuarioEntity> {
        const { idPessoa, senha } = usuarioData;
        if (typeof idPessoa !== 'number' || typeof senha !== 'string') {
            throw new Error("Dados incorretos: Insira os dados em seus devidos formatos");
        }
        if (!idPessoa || !senha) {
            throw new Error("Dados incompletos: Verifique se todos os campos foram preechidos");
        }
        const verificarUsuario = await this.usuarioRepository.filterByIdPessoa(idPessoa);
        if (verificarUsuario.length > 0) {
            throw new Error("Esse usuario já esxite");
        }
        const verificaPessoa = await this.pessoaService.listarPessoaPorId(idPessoa);
        if (!verificaPessoa) {
            throw new Error("Está pessoa não está cadastrada");
        }
        const novoUsuario = this.usuarioRepository.insertUsuario(new UsuarioEntity(undefined, idPessoa, senha));
        console.log("Service - Insert ", novoUsuario);
        return novoUsuario;
    }

    async listarUsuarioPorId(usuarioData: any): Promise<UsuarioEntity[]> {
        const id: number = usuarioData;
        const usuario = await this.usuarioRepository.filterById(usuarioData);
        if (usuario.length === 0) {
            throw new Error("Usuario não cadastrado");
        }
        console.log("Service - Filter ID ", usuario);
        return usuario;
    }

    async listarUsuarios(): Promise<UsuarioEntity[]> {
        const usuarios = this.usuarioRepository.getAll();
        console.log("Service - Filter All ", usuarios);
        return usuarios;
    }

    async atualizarUsuario(usuarioData: any): Promise<UsuarioEntity> {
        const { idPessoa, senha, id } = usuarioData;
        const verificar = await this.listarUsuarioPorId(id);
        if (!verificar) {
            throw new Error("Usuario não localizado");
        }
        const usuario = new UsuarioEntity(id, idPessoa, senha)
        await this.usuarioRepository.updateSenha(usuarioData);
        console.log("Service - Update ", usuario);
        return usuario;
    }

    async deletarUsuario(usuarioData: any): Promise<UsuarioEntity> {
        const { id, idPessoa } = usuarioData;
        const usuario = new UsuarioEntity(id, idPessoa);
        const verificarUsuario = await this.listarUsuarioPorId(id);
        if (verificarUsuario.length === 0) {
            throw new Error("Usuario não localizado");
        }
        await this.usuarioRepository.deleteUsuario(usuarioData);
        console.log("Service - Delete ", usuario);
        return usuario;
    }
}
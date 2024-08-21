import { UsuarioEntity } from "../model/entity/UsuarioEntity";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { PessoaService } from "./PessoaService";

export class UsuarioService {
    usuarioRepository = UsuarioRepository.getInstace();
    pessoaService: PessoaService = new PessoaService();

    async criarUsuario(usuarioData: any): Promise<UsuarioEntity> {
        const { idPesssoa, senha, } = usuarioData;
        if (typeof idPesssoa !== 'number' || typeof senha !== 'string') {
            throw new Error("Dados incorretos, verificar se é 'string' ou 'number'");
        }
        if (!idPesssoa || !senha) {
            throw new Error("É necesario inserir um id e um pessoa");
        }
        const verificarUsuario = await this.usuarioRepository.filterById(usuarioData);
        if (verificarUsuario) {
            throw new Error("Esse usuario já esxite");
        }
        const verificaPessoa = await this.pessoaService.listarPessoaPorId(idPesssoa);
        if (!verificaPessoa) {
            throw new Error("Não existe uma pessoa com esse id");
        }
        const novaUsuario = this.usuarioRepository.insertUsuario(new UsuarioEntity(undefined, idPesssoa, senha));
        console.log("Service - Insert ", novaUsuario);
        return novaUsuario;
    }

    async listarUsuarioPorId(usuarioData: any): Promise<UsuarioEntity> {
        const id: number = usuarioData;
        const usuario = await this.usuarioRepository.filterById(usuarioData);
        console.log("Service - Filter ID ", usuario);
        return usuario;
    }

    async listarUsuarios(): Promise<UsuarioEntity[]> {
        const usuarios = this.usuarioRepository.getAll();
        console.log("Service - Filter All ", usuarios);
        return usuarios;
    }

    async atualizarUsuario(usuarioData: any): Promise<UsuarioEntity> {
        const { id, idPessoa, senha } = usuarioData;
        const verificar = await this.listarUsuarioPorId(id);
        if (!verificar) {
            throw new Error("Usuario não localizada");
        }
        const usuario = new UsuarioEntity(id, senha)
        await this.usuarioRepository.updateSenha(usuarioData);
        console.log("Service - Update ", usuario);
        return usuario;
    }

    async deletarUsuario(usuarioData: any): Promise<UsuarioEntity> {
        const { id, idPessoa, senha } = usuarioData;
        const usuario = new UsuarioEntity(id, idPessoa, senha)
        await this.usuarioRepository.deleteUsuario(usuarioData);
        console.log("Service - Delete ", usuario);
        return usuario;
    }
}
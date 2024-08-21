import { UsuarioEntity } from "../model/entity/UsuarioEntity";
import { executarComandoSQL } from "../database/mysql";

export class UsuarioRepository {
    private static instance: UsuarioRepository;

    constructor() {
        this.createTable();
    }

    public static getInstace(): UsuarioRepository {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance
    }
    private async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.usuario(
                        id NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        idPessoa INT NOT NULL,
                        senha VARCHAR(200) NOT NULL,
                        FOREiGN KEY (idPessoa) REFERENCES biblioteca.pessoa(id)
                        )`;
        try {
            const resultado = await executarComandoSQL(query, []);
            console.log("Sucesso ao criar tabela Usuario")
        }
        catch (err) {
            console.error('Error');
        }
    }

    async insertUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        try {
            const resultado = await executarComandoSQL("INSERT INTO biblioteca.usuario (idPessoa, senha) VALUES (?, ?)", [usuario.idPessoa, usuario.senha]);
            console.log("Usuario inserido com sucesso: ", resultado.insertId);
            usuario.id = resultado.insertId;
            return new Promise<UsuarioEntity>((resolve) => {
                resolve(usuario);
            });
        } catch (err) {
            console.error("Erro ao inserir usuario: ", err);
            throw err
        }
    }

    async filterById(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        try {
            const query = "SELECT * FROM biblioteca.usuario WHERE id = ? ";
            const resultado = await executarComandoSQL(query, [usuario.id]);
            console.log("Usuario localizado com sucesso: ", resultado);
            return new Promise<UsuarioEntity>((resolve) => {
                resolve(resultado);
            });
        } catch (err) {
            console.error(`Não foi possivel localizar usuario de ID: ${usuario.id}`, err);
            throw err;
        }
    }

    async getAll(): Promise<UsuarioEntity[]> {
        const query = "SELECT * FROM biblioteca.usuario";
        try {
            const resultado: UsuarioEntity[] = await executarComandoSQL(query, []);
            return new Promise<UsuarioEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Não foi possivel listar os usuarios:  ${err}`);
            throw err;
        }
    }

    async updateSenha(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        const query = "UPDATE biblioteca.usuario SET senha = ? WHERE id = ?";
        try {
            const resultado = await executarComandoSQL(query, [usuario.senha])
            console.log("Senha atualizada com sucesso ");
            return new Promise<UsuarioEntity>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Não foi possivel atualizar a senha`, err);
            throw err;
        }
    }

    async deleteUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        const query = "DELETE FROM biblioteca.usuario WHERE id = ? AND senha =?";
        try {
            const resultado = await executarComandoSQL(query, [usuario.id, usuario.senha])
            console.log("Usuario deletado com sucesso: ", usuario);
            return new Promise<UsuarioEntity>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Não foi possivel deletar a usuario de id: ${usuario.id}`, err);
            throw err;
        }
    }
}
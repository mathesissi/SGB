import { UsuarioEntity } from "../model/entity/UsuarioEntity";
import { executarComandoSQL } from "../database/mysql";


export class UsuarioRepository {
    private static instance: UsuarioRepository;

    private constructor() {
        this.createTable();
    }

    public static getInstace(): UsuarioRepository {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance
    }
    private async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS sgb.usuario(
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        idPessoa INT NOT NULL,
                        senha VARCHAR(200) NOT NULL,
                        FOREiGN KEY (idPessoa) REFERENCES sgb.pessoa(id)
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
        const query = "INSERT INTO sgb.usuario (idPessoa, senha) VALUES (?, ?)"
        try {
            const resultado = await executarComandoSQL(query, [usuario.idPessoa, usuario.senha]);
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

    async filterById(id: number): Promise<UsuarioEntity[]> {
        const query = "SELECT * FROM sgb.usuario WHERE id = ? ";
        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log("Usuario localizado com sucesso: ", resultado);
            return new Promise<UsuarioEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err) {
            console.error(`Não foi possivel localizar usuario de ID: ${id}`, err);
            throw err;
        }
    }

    async filterByIdPessoa(idPessoa: number): Promise<UsuarioEntity[]> {
        const query = "SELECT * FROM sgb.usuario WHERE idPessoa = ? ";
        try {
            const resultado = await executarComandoSQL(query, [idPessoa]);
            console.log("Usuario localizado com sucesso: ", resultado);
            return new Promise<UsuarioEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err) {
            console.error(`Não foi possivel localizar usuario de ID: ${idPessoa}`, err);
            throw err;
        }
    }

    async getAll(): Promise<UsuarioEntity[]> {
        const query = "SELECT * FROM sgb.usuario";
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
        const query = "UPDATE sgb.usuario SET senha = ? WHERE id = ?";
        try {
            const resultado = await executarComandoSQL(query, [usuario.senha, usuario.id])
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
        const query = "DELETE FROM sgb.usuario WHERE id = ? AND idPessoa =?";
        try {
            const resultado = await executarComandoSQL(query, [usuario.id, usuario.idPessoa])
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
import { PessoaEntity } from "../model/entity/PessoaEntity";
import { executarComandoSQL } from "../database/mysql";

export class PessoaRepository {
    private static instance: PessoaRepository;
    private constructor() {
        this.createTable();
    }

    public static getInstace(): PessoaRepository {
        if (!this.instance) {
            this.instance = new PessoaRepository();
        }
        return this.instance
    }

    private async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.pessoa (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        nome VARCHAR(255) NOT NULL,
                        email VARCHAR(255) NOT NULL
);`;
        try {
            const resultado = await executarComandoSQL(query, []);
            console.log("Sucesso ao criar tabela Pessoa")
        }
        catch (err) {
            console.error('Error');
        }
    }

    async insertPessoa(pessoa: PessoaEntity): Promise<PessoaEntity> {
        try {
            const resultado = await executarComandoSQL("INSERT INTO biblioteca.pessoa (nome, email) VALUES (?, ?)", [pessoa.nome, pessoa.email]);
            console.log("Pessoa inserida com sucesso: ", resultado.insertId);
            pessoa.id = resultado.insertId;
            return new Promise<PessoaEntity>((resolve) => {
                resolve(pessoa);
            });
        } catch (err) {
            console.error("Erro ao inserir pessoa: ", err);
            throw err
        }
    }
    async filterById(pessoa: PessoaEntity): Promise<PessoaEntity> {
        try {
            const query = "SELECT * FROM biblioteca.pessoa WHERE id = ? ";
            const resultado = await executarComandoSQL(query, [pessoa.id]);
            console.log("Pessoa localizada com sucesso: ", resultado);
            return new Promise<PessoaEntity>((resolve) => {
                resolve(resultado);
            });
        } catch (err) {
            console.error(`Não foi possivel localizar pessoa de ID: ${pessoa.id}`, err);
            throw err;
        }
    }

    async filterByName(pessoa: PessoaEntity): Promise<PessoaEntity> {
        try {
            const query = "SELECT * FROM biblioteca.pessoa WHERE nome = ? ";
            const resultado = await executarComandoSQL(query, [pessoa.nome]);
            console.log("Pessoa localizada com sucesso: ", resultado);
            return new Promise<PessoaEntity>((resolve) => {
                resolve(resultado);
            });
        } catch (err) {
            console.error(`Não foi possivel localizar pessoa com nome: ${pessoa.nome}`, err);
            throw err;
        }
    }

    async filterByEmail(pessoa: PessoaEntity): Promise<PessoaEntity> {
        try {
            const query = "SELECT * FROM biblioteca.pessoa WHERE email = ? ";
            const resultado = await executarComandoSQL(query, [pessoa.email]);
            console.log("Pessoa localizada com sucesso: ", resultado);
            return new Promise<PessoaEntity>((resolve) => {
                resolve(resultado);
            });
        } catch (err) {
            console.error(`Não foi possivel localizar pessoa com email: ${pessoa.email}`, err);
            throw err;
        }
    }

    async getAll(): Promise<PessoaEntity[]> {
        const query = "SELECT * FROM biblioteca.pessoa";
        try {
            const resultado: PessoaEntity[] = await executarComandoSQL(query, []);
            return new Promise<PessoaEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Não foi possivel listar as pessoas:  ${err}`);
            throw err;
        }
    }

    async updateEmail(pessoa: PessoaEntity): Promise<PessoaEntity> {
        const query = "UPDATE biblioteca.pessoa SET email = ? WHERE id = ? OR name = ?";
        try {
            const resultado = await executarComandoSQL(query, [pessoa.id, pessoa.nome, pessoa.email])
            console.log("Email atualizado com sucesso: ", pessoa);
            return new Promise<PessoaEntity>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Não foi possivel atualizar o email`, err);
            throw err;
        }
    }

    async deletePessoa(pessoa: PessoaEntity): Promise<PessoaEntity> {
        const query = "DELETE FROM biblioteca.pessoa WHERE id = ? or email = ?";
        try {
            const resultado = await executarComandoSQL(query, [pessoa.id, pessoa.email])
            console.log("Pessoa deletada com sucesso: ", pessoa);
            return new Promise<PessoaEntity>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Não foi possivel deletar a pessoa de id: ${pessoa.id}`, err);
            throw err;
        }
    }
}
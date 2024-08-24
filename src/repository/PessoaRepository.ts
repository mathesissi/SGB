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
        const query = `CREATE TABLE IF NOT EXISTS sgb.pessoa (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        nome VARCHAR(255) NOT NULL,
                        email VARCHAR(255) NOT NULL
)`;
        try {
            const resultado = await executarComandoSQL(query, []);
            console.log("Sucesso ao criar tabela Pessoa", resultado)
        } catch (err) {
            console.error('Error');
        }
    }

    async insertPessoa(pessoa: PessoaEntity): Promise<PessoaEntity> {
        const query = "INSERT INTO sgb.pessoa (nome, email) VALUES (?,?)";
        try {
            const resultado = await executarComandoSQL(query, [pessoa.nome, pessoa.email]);
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

    async filterById(id: number): Promise<PessoaEntity[]> {
        const query = "SELECT * FROM sgb.pessoa WHERE id = ? ";
        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log("Pessoa localizada com sucesso: ", resultado);
            return new Promise<PessoaEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err) {
            console.error(`Não foi possivel localizar pessoa de ID: ${id}`, err);
            throw err;
        }
    }

    async filterByName(nome: string): Promise<PessoaEntity[]> {
        const query = "SELECT * FROM sgb.pessoa WHERE nome = ? ";
        try {
            const resultado = await executarComandoSQL(query, [nome]);
            console.log("Pessoa localizada com sucesso: ", resultado);
            return new Promise<PessoaEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err) {
            console.error(`Não foi possivel localizar pessoa com nome: ${nome}`, err);
            throw err;
        }
    }

    async filterByEmail(email: string): Promise<PessoaEntity[]> {
        const query = "SELECT * FROM sgb.pessoa WHERE email = ? ";
        try {
            const resultado = await executarComandoSQL(query, [email]);
            console.log("Pessoa localizada com sucesso: ", resultado);
            return new Promise<PessoaEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err) {
            console.error(`Não foi possivel localizar pessoa com email`, err);
            throw err;
        }
    }

    async getAll(): Promise<PessoaEntity[]> {
        const query = "SELECT * FROM sgb.pessoa";
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
        const query = "UPDATE sgb.pessoa SET email = ? WHERE id = ?";
        try {
            const resultado = await executarComandoSQL(query, [pessoa.email, pessoa.id]);
            console.log("Email atualizado com sucesso: ", pessoa);
            return new Promise<PessoaEntity>((resolve) => {
                resolve(pessoa);
            });
        } catch (err: any) {
            console.error(`Não foi possivel atualizar o email`, err);
            throw err;
        }
    }

    async deletePessoa(pessoa: PessoaEntity): Promise<PessoaEntity> {
        const query = "DELETE FROM sgb.pessoa WHERE email = ?";
        try {
            const resultado = await executarComandoSQL(query, [pessoa.email])
            console.log("Pessoa deletada com sucesso: ", pessoa);
            return new Promise<PessoaEntity>((resolve) => {
                resolve(pessoa);
            });
        } catch (err: any) {
            console.error(`Não foi possivel deletar a pessoa`, err);
            throw err;
        }
    }
}
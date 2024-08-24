import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";
import { executarComandoSQL } from "../database/mysql";

export class EmprestimoRepository {
    private static instance: EmprestimoRepository;

    private constructor() {
        this.createTable();
    }

    public static getInstace(): EmprestimoRepository {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance
    }
    private async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS sgb.emprestimo(
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        livroId INT NOT NULL,
                        usuarioId INT NOT NULL,
                        dataEmprestimo Date NOT NULL,
                        dataDevolucao Date NOT NULL,
                        FOREiGN KEY (livroId) REFERENCES sgb.livro(id),
                        FOREiGN KEY (usuarioID) REFERENCES sgb.usuario(id)
                        )`;
        try {
            const resultado = await executarComandoSQL(query, []);
            console.log("Sucesso ao criar tabela Emprestimo")
        }
        catch (err) {
            console.error('Error');
        }
    }

    async insertEmprestimo(emprestimo: EmprestimoEntity): Promise<EmprestimoEntity> {
        const query = "INSERT INTO sgb.Emprestimo (livroID, usuarioId, dataEmprestimo, dataDevolucao) VALUES (?, ?, ?, ?)"
        try {
            const resultado = await executarComandoSQL(query, [emprestimo.livroId, emprestimo.usuarioId, emprestimo.dataEmprestimo, emprestimo.dataDevolucao]);
            console.log("Emprestimo realizado com sucesso: ", resultado.insertId);
            emprestimo.id = resultado.insertId;
            return new Promise<EmprestimoEntity>((resolve) => {
                resolve(emprestimo);
            });
        } catch (err) {
            console.error("Erro ao realizar o emprestimo: ", err);
            throw err
        }
    }

    async filterById(id: number): Promise<EmprestimoEntity[]> {
        try {
            const query = "SELECT * FROM sgb.emprestimo WHERE id = ? ";
            const resultado = await executarComandoSQL(query, [id]);
            console.log("Emprestimo localizado com sucesso: ", resultado);
            return new Promise<EmprestimoEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err) {
            console.error(`Não foi possivel consultar emprestimo de ID: ${id}`, err);
            throw err;
        }
    }

    async filterByUsuario(idUsuario: number): Promise<EmprestimoEntity[]> {
        try {
            const query = "SELECT * FROM sgb.emprestimo WHERE usuarioId = ? ";
            const resultado = await executarComandoSQL(query, [idUsuario]);
            console.log("Emprestimo localizado com sucesso: ", resultado);
            return new Promise<EmprestimoEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err) {
            console.error(`Não foi possivel consultar emprestimo por usuario de ID: ${idUsuario}`, err);
            throw err;
        }
    }

    async filterByLivro(idLivro: number): Promise<EmprestimoEntity[]> {
        try {
            const query = "SELECT * FROM sgb.emprestimo WHERE livroId = ? ";
            const resultado = await executarComandoSQL(query, [idLivro]);
            console.log("Emprestimo localizado com sucesso: ", resultado);
            return new Promise<EmprestimoEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err) {
            console.error(`Não foi possivel consultar emprestimo por Livro de id: ${idLivro}`, err);
            throw err;
        }
    }

    async getAll(): Promise<EmprestimoEntity[]> {
        const query = "SELECT * FROM sgb.emprestimo";
        try {
            const resultado: EmprestimoEntity[] = await executarComandoSQL(query, []);
            return new Promise<EmprestimoEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Não foi possivel listar os emprestimos:  ${err}`);
            throw err;
        }
    }

    async updateEmprestimo(emprestimo: EmprestimoEntity): Promise<EmprestimoEntity> {
        const query = "UPDATE sgb.emprestimo SET dataDevolucao = ? WHERE id = ?";
        try {
            const resultado = await executarComandoSQL(query, [emprestimo.dataDevolucao, emprestimo.id]);
            console.log("Emprestimo atualizado com sucesso ");
            return new Promise<EmprestimoEntity>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Não foi possivel atualizar emprestimo`, err);
            throw err;
        }
    }

    async deleteEmprestimo(emprestimo: EmprestimoEntity): Promise<EmprestimoEntity> {
        const query = "DELETE FROM sgb.emprestimo WHERE id = ?";
        try {
            const resultado = await executarComandoSQL(query, [emprestimo.id])
            console.log("Emprestimo deletado com sucesso: ", emprestimo);
            return new Promise<EmprestimoEntity>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Não foi possivel deletar o emprestimo de id: ${emprestimo.id}`, err);
            throw err;
        }
    }
}
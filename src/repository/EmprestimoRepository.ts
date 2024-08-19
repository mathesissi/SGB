import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";
import { executarComandoSQL } from "../database/mysql";

export class EmprestimoRepository {
    constructor() {
        this.createTable();
    }

    private async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.emprestimo(
                        id NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        livroId INT NOT NULL,
                        usuarioId INT NOT NULL,
                        dataEmpresotimo Date NOT NULL,
                        dataDevolucao Date NOT NULL,
                        FOREiGN KEY (livroId) REFERENCES biblioteca.livro(id),
                        FOREiGN KEY (usuarioID) REFERENCES biblioteca.usuario(id)
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
        try {
            const resultado = await executarComandoSQL("INSERT INTO biblioteca.Emprestimo (livroID, usuarioId, dataEmprestimo, dataDevolucao) VALUES (?, ?, ?, ?)", [emprestimo.livroId, emprestimo.usuarioId, emprestimo.dataEmprestimo, emprestimo.dataDevolucao]);
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

    async filterById(emprestimo: EmprestimoEntity): Promise<EmprestimoEntity> {
        try {
            const query = "SELECT * FROM biblioteca.emprestimo WHERE id = ? ";
            const resultado = await executarComandoSQL(query, [emprestimo.id]);
            console.log("Emprestimo localizado com sucesso: ", resultado);
            return new Promise<EmprestimoEntity>((resolve) => {
                resolve(resultado);
            });
        } catch (err) {
            console.error(`Não foi possivel consultar emprestimo de ID: ${emprestimo.id}`, err);
            throw err;
        }
    }

    async getAll(): Promise<EmprestimoEntity[]> {
        const query = "SELECT * FROM biblioteca.emprestimo";
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
        const query = "UPDATE biblioteca.emprestimo SET dataDevolucao = ? WHERE id = ?";
        try {
            const resultado = await executarComandoSQL(query, [emprestimo.dataDevolucao])
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
        const query = "DELETE FROM biblioteca.emprestimo WHERE id = ?";
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
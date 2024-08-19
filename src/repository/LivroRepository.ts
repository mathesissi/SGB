import { LivroEntity } from "../model/entity/LivroEntity";
import { executarComandoSQL } from "../database/mysql";

export class LivroRepository {
    constructor() {
        this.createTable();
    }

    private async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.livro(
                        id NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        titulo VARCHAR(255) NOT NULL,
                        titulo VARCHAR(255) NOT NULL,
                        categoriaId  NOT NULL
                        FOREiGN KEY (categoriaId) REFERENCES biblioteca.categoria(id)
                        )`;
        try {
            const resultado = await executarComandoSQL(query, []);
            console.log("Sucesso ao criar tabela Livro")
        }
        catch (err) {
            console.error('Error');
        }
    }

    async insertLivro(livro: LivroEntity): Promise<LivroEntity> {
        try {
            const resultado = await executarComandoSQL("INSERT INTO biblioteca.Livro (titulo, autor, categoriaId) VALUES (?, ?, ?)", [livro.titulo, livro.autor, livro.categoriaId]);
            console.log("Livro cadastrado com sucesso: ", resultado.insertId);
            livro.id = resultado.insertId;
            return new Promise<LivroEntity>((resolve) => {
                resolve(livro);
            });
        } catch (err) {
            console.error("Erro ao cadastrar o livro: ", err);
            throw err
        }
    }

    async filterById(livro: LivroEntity): Promise<LivroEntity> {
        try {
            const query = "SELECT * FROM biblioteca.livro WHERE id = ? OR name ";
            const resultado = await executarComandoSQL(query, [livro.id, livro.titulo]);
            console.log("Livro localizado com sucesso: ", resultado);
            return new Promise<LivroEntity>((resolve) => {
                resolve(resultado);
            });
        } catch (err) {
            console.error(`Não foi possivel consultar o livro: ${livro.id}`, err);
            throw err;
        }
    }

    async getAll(): Promise<LivroEntity[]> {
        const query = "SELECT * FROM biblioteca.livros";
        try {
            const resultado: LivroEntity[] = await executarComandoSQL(query, []);
            return new Promise<LivroEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Não foi possivel listar os livross:  ${err}`);
            throw err;
        }
    }

    async updateLivro(livro: LivroEntity): Promise<LivroEntity> {
        const query = "UPDATE biblioteca.livros SET dataDevolucao = ? WHERE id = ?";
        try {
            const resultado = await executarComandoSQL(query, [livro.da])
            console.log("Livro atualizado com sucesso ");
            return new Promise<LivroEntity>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Não foi possivel atualizar livros`, err);
            throw err;
        }
    }

    async deleteLivro(livros: LivroEntity): Promise<LivroEntity> {
        const query = "DELETE FROM biblioteca.livros WHERE id = ?";
        try {
            const resultado = await executarComandoSQL(query, [livros.id])
            console.log("Livro deletado com sucesso: ", livros);
            return new Promise<LivroEntity>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Não foi possivel deletar o livros de id: ${livros.id}`, err);
            throw err;
        }
    }
}
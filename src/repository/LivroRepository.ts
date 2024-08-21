import { LivroEntity } from "../model/entity/LivroEntity";
import { executarComandoSQL } from "../database/mysql";

export class LivroRepository {
    private static instance: LivroRepository;

    constructor() {
        this.createTable();
    }

    public static getInstace(): LivroRepository {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance
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
            const query = "SELECT * FROM biblioteca.livro WHERE id = ?";
            const resultado = await executarComandoSQL(query, [livro.id]);
            console.log("Livro localizado com sucesso: ", resultado);
            return new Promise<LivroEntity>((resolve) => {
                resolve(resultado);
            });
        } catch (err) {
            console.error(`Não foi possivel consultar o livro: ${livro.id}`, err);
            throw err;
        }
    }
    async filterByTitulo(livro: LivroEntity): Promise<LivroEntity> {
        try {
            const query = "SELECT * FROM biblioteca.livro WHERE titulo = ?";
            const resultado = await executarComandoSQL(query, [livro.titulo]);
            console.log("Livro localizado com sucesso: ", resultado);
            return new Promise<LivroEntity>((resolve) => {
                resolve(resultado);
            });
        } catch (err) {
            console.error(`Não foi possivel consultar o livro: ${livro.id}`, err);
            throw err;
        }
    }

    async filterByAutor(livro: LivroEntity): Promise<LivroEntity[]> {
        try {
            const query = "SELECT * FROM biblioteca.livro WHERE autor = ?";
            const resultado: LivroEntity[] = await executarComandoSQL(query, [livro.autor]);
            console.log("Livros encontrados com sucesso: ", resultado);
            return new Promise<LivroEntity[]>((resolve) => {
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
        const query = "UPDATE biblioteca.livros SET autor = ?, titulo = ?, categoriaId = ? WHERE id = ?";
        try {
            const resultado = await executarComandoSQL(query, [livro.autor, livro.titulo, livro.id]);
            console.log("Livro atualizado com sucesso ");
            return new Promise<LivroEntity>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Não foi possivel atualizar livro`, err);
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
            console.error(`Não foi possivel deletar o livro`, err);
            throw err;
        }
    }
}
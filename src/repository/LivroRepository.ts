import { LivroEntity } from "../model/entity/LivroEntity";
import { executarComandoSQL } from "../database/mysql";

export class LivroRepository {
    private static instance: LivroRepository;

    private constructor() {
        this.createTable();
    }

    public static getInstace(): LivroRepository {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance
    }
    private async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS sgb.livro (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        titulo VARCHAR(255) NOT NULL,
                        autor VARCHAR(255) NOT NULL,
                        categoriaId INT NOT NULL,
                        FOREiGN KEY (categoriaId) REFERENCES sgb.categoria(id)
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
        const query = "INSERT INTO sgb.Livro (titulo, autor, categoriaId) VALUES (?, ?, ?)";
        try {
            const resultado = await executarComandoSQL(query, [livro.titulo, livro.autor, livro.categoriaId]);
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

    async filterById(id: number): Promise<LivroEntity[]> {
        try {
            const query = "SELECT * FROM sgb.livro WHERE id = ?";
            const resultado = await executarComandoSQL(query, [id]);
            console.log("Livro localizado com sucesso: ", resultado);
            return new Promise<LivroEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err) {
            console.error(`Não foi possivel consultar o livro: ${id}`, err);
            throw err;
        }
    }
    async filterByTitulo(titulo: string): Promise<LivroEntity[]> {
        try {
            const query = "SELECT * FROM sgb.livro WHERE titulo = ?";
            const resultado = await executarComandoSQL(query, [titulo]);
            console.log("Livro localizado com sucesso: ", resultado);
            return new Promise<LivroEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err) {
            console.error(`Não foi possivel consultar o livro: ${titulo}`, err);
            throw err;
        }
    }

    async filterByAutor(autor: string): Promise<LivroEntity[]> {
        try {
            const query = "SELECT * FROM sgb.livro WHERE autor = ?";
            const resultado: LivroEntity[] = await executarComandoSQL(query, [autor]);
            console.log("Livros encontrados com sucesso: ", resultado);
            return new Promise<LivroEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err) {
            console.error(`Não foi possivel consultar o livro: ${autor}`, err);
            throw err;
        }
    }

    async getAll(): Promise<LivroEntity[]> {
        const query = "SELECT * FROM sgb.livro";
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
        const query = "UPDATE sgb.livro SET autor = ?, titulo = ?, categoriaId = ? WHERE id = ?";
        try {
            const resultado = await executarComandoSQL(query, [livro.autor, livro.titulo, livro.categoriaId, livro.id]);
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
        const query = "DELETE FROM sgb.livro WHERE id = ?";
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
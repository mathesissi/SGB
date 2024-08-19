import { executarComandoSQL } from "../database/mysql";
import { CategoriaEntity } from "../model/entity/CategoriaEntity";

export class CategoriaRepository {
    private static instance: CategoriaRepository;

    private construtor() {
        this.createTable();
    }

    public static getInstace(): CategoriaRepository {
        if (!this.instance) {
            this.instance = new CategoriaRepository();
        }
        return this.instance
    }

    private async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.categoria (
                        id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                        nome VARCHAR(255) NOT NULL
                        )`;
        try {
            const resultado = await executarComandoSQL(query, []);
            console.log("Sucesso ao criar tabela Curso")
        }
        catch (err) {
            console.error('Error');
        }
    }

    async insertCategoria(categoria: CategoriaEntity): Promise<CategoriaEntity> {
        try {
            const resultado = await executarComandoSQL("INSERT INTO biblioteca.categoria (nome) VALUES (?)", [categoria.id, categoria.nome]);
            console.log("Categoria criadao com sucesso: ", resultado.insertId);
            categoria.id = resultado.insertId;
            return new Promise<CategoriaEntity>((resolve) => {
                resolve(categoria);
            });
        } catch (err) {
            console.error("Erro ao criar uma categoria: ", err);
            throw err
        }
    }
    async filterById(categoria: CategoriaEntity): Promise<CategoriaEntity> {
        try {
            const query = "SELECT * FROM biblioteca.categoria WHERE id = ? ";
            const resultado = await executarComandoSQL(query, [categoria.id]);
            console.log("Categoria localizada com sucesso: ", resultado);
            return new Promise<CategoriaEntity>((resolve) => {
                resolve(resultado);
            });
        } catch (err) {
            console.error(`Não foi possivel localizar a categoria: ${categoria.id}`, err);
            throw err;
        }
    }
    async filterByName(categoria: CategoriaEntity): Promise<CategoriaEntity> {
        try {
            const query = "SELECT * FROM biblioteca.categoria WHERE nome = ? ";
            const resultado = await executarComandoSQL(query, [categoria.nome]);
            console.log("Categoria localizada com sucesso: ", resultado);
            return new Promise<CategoriaEntity>((resolve) => {
                resolve(resultado);
            });
        } catch (err) {
            console.error(`Não foi possivel localizar a categoria: ${categoria.nome}`, err);
            throw err;
        }
    }

    async getAll(): Promise<CategoriaEntity[]> {
        const query = "SELECT * FROM biblioteca.categoria";
        try {
            const resultado: CategoriaEntity[] = await executarComandoSQL(query, []);
            return new Promise<CategoriaEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Não foi possivel listar as categorias:  ${err}`);
            throw err;
        }
    }

    async updateCategoria(categoria: CategoriaEntity): Promise<CategoriaEntity> {
        const query = "UPDATE biblioteca.categoria SET nome = ? WHERE id = ?";
        try {
            const resultado = await executarComandoSQL(query, [categoria.id, categoria.nome])
            console.log("Categoria atualizada com sucesso: ", categoria);
            return new Promise<CategoriaEntity>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Não foi possivel atualizar a categoria de id: ${categoria.id}`, err);
            throw err;
        }
    }

    async deleteCategoria(categoria: CategoriaEntity): Promise<CategoriaEntity> {
        const query = "DELETE FROM biblioteca.categoria WHERE id = ?";
        try {
            const resultado = await executarComandoSQL(query, [categoria.id])
            console.log("Categoria deletada com sucesso: ", categoria);
            return new Promise<CategoriaEntity>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Não foi possivel deletar a categoria de id: ${categoria.id}`, err);
            throw err;
        }
    }
}
import { executarComandoSQL } from "../database/mysql";
import { CategoriaEntity } from "../model/entity/CategoriaEntity";

export class CategoriaRepository {
    private static instance: CategoriaRepository;
    private constructor() {
        this.createTable();
    }

    public static getInstace(): CategoriaRepository {
        if (!this.instance) {
            this.instance = new CategoriaRepository();
        }
        return this.instance
    }

    private async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS sgb.categoria (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        nome VARCHAR(255) NOT NULL
                        )`;
        try {
            const resultado = await executarComandoSQL(query, []);
            console.log("Sucesso ao criar tabela Categoria", resultado)
        }
        catch (err) {
            console.error('Error');
        }
    }

    async insertCategoria(categoria: CategoriaEntity): Promise<CategoriaEntity> {
        const query = "INSERT INTO sgb.categoria (nome) VALUES (?)"
        try {
            const resultado = await executarComandoSQL(query, [categoria.nome]);
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
    async filterById(id: number): Promise<CategoriaEntity[]> {
        const query = "SELECT * FROM sgb.categoria WHERE id = ? ";
        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log("Categoria localizada com sucesso: ", resultado);
            return new Promise<CategoriaEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err) {
            console.error(`Não foi possivel localizar a categoria: ${id}`, err);
            throw err;
        }
    }

    async filterByName(nome: string): Promise<CategoriaEntity[]> {
        try {
            const query = "SELECT * FROM sgb.categoria WHERE nome = ? ";
            const resultado = await executarComandoSQL(query, [nome]);
            console.log("Categoria localizada com sucesso: ", resultado);
            return new Promise<CategoriaEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err) {
            console.error(`Não foi possivel localizar a categoria: ${nome}`, err);
            throw err;
        }
    }

    async getAll(): Promise<CategoriaEntity[]> {
        const query = "SELECT * FROM sgb.categoria";
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

    async updateCategoria(categoria: CategoriaEntity): Promise<CategoriaEntity[]> {
        const query = "UPDATE sgb.categoria SET nome = ? WHERE id = ?";
        try {
            const resultado = await executarComandoSQL(query, [categoria.nome, categoria.id])
            console.log("Categoria atualizada com sucesso: ", categoria);
            return new Promise<CategoriaEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Não foi possivel atualizar a categoria de id: ${categoria.id}`, err);
            throw err;
        }
    }

    async deleteCategoria(categoria: CategoriaEntity): Promise<CategoriaEntity> {
        const query = "DELETE FROM sgb.categoria WHERE id = ?";
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
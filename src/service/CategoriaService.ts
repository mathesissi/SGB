import { CategoriaEntity } from "../model/entity/CategoriaEntity";
import { CategoriaRepository } from "../repository/CategoriaRepository";

export class CategoriaService {
    categoriaRepository = CategoriaRepository.getInstace();

    async criarCategoria(categoriaData: any): Promise<CategoriaEntity> {
        const { nome } = categoriaData;
        if (typeof nome !== 'string') {
            throw new Error("Dado incorreto, verificar se é 'string'");
        }
        if (!nome) {
            throw new Error("É necesario inserir um nome");
        }
        const verificarCategoria = await this.categoriaRepository.filterByName(categoriaData);

        const novaCategoria = this.categoriaRepository.insertCategoria(new CategoriaEntity(undefined, nome));
        console.log("Service - Insert ", novaCategoria);
        return novaCategoria;
    }

    async listarCategoriaPorId(categoriaData: any): Promise<CategoriaEntity> {
        const id: number = categoriaData;
        const categoria = await this.categoriaRepository.filterById(categoriaData);
        console.log("Service - Filter ID ");
        return categoria;
    }

    async listarCategoriaPorNome(categoriaData: any): Promise<CategoriaEntity> {
        const nome: string = categoriaData;
        const categoria = await this.categoriaRepository.filterByName(categoriaData);
        console.log("Service - Filter Nome ");
        return categoria;
    }

    async listarCategorias(): Promise<CategoriaEntity[]> {
        const categorias = this.categoriaRepository.getAll();
        console.log("Service - Filter All ");
        return categorias;
    }

    async atualizarCategoria(categoriaData: any): Promise<CategoriaEntity> {
        const { id, nome } = categoriaData;
        const verificar = await this.listarCategoriaPorId(id);
        if (!verificar) {
            throw new Error("Categoria não localizada");
        }
        const categoria = new CategoriaEntity(id, nome)
        await this.categoriaRepository.updateCategoria(categoriaData);
        console.log("Service - Update ");
        return categoria;
    }

    async deletarCategoria(categoriaData: any): Promise<CategoriaEntity> {
        const { id, nome } = categoriaData;
        const categoria = new CategoriaEntity(id, nome)
        await this.categoriaRepository.deleteCategoria(categoriaData);
        console.log("Service - Delete ");
        return categoria;
    }
}
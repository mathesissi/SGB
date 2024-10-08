import { LivroEntity } from "../model/entity/LivroEntity";
import { LivroRepository } from "../repository/LivroRepository";
import { CategoriaService } from "./CategoriaService";

export class LivroService {
    livroRepository = LivroRepository.getInstace();
    categoriaService: CategoriaService = new CategoriaService();


    async criarLivro(livroData: any): Promise<LivroEntity> {
        const { titulo, autor, categoriaId } = livroData;
        if (typeof titulo !== 'string' || typeof autor !== 'string' || typeof categoriaId !== 'number') {
            throw new Error("Dados incorretos: Insira os dados em seus devidos formatos");
        }
        if (!titulo || !autor || !categoriaId) {
            throw new Error("Dados incompletos: Verifique se todos os campos foram preechidos");
        }
        const verificarLivro = await this.livroRepository.filterByTitulo(titulo);
        if (verificarLivro.length > 0) {
            throw new Error("Esse livro já existe!");
        }
        const verificarCategoria = await this.categoriaService.listarCategoriaPorId(categoriaId);
        if (!verificarCategoria) {
            throw new Error("Essa categoria não existe!");
        }
        const novoLivro = this.livroRepository.insertLivro(new LivroEntity(undefined, titulo, autor, categoriaId));
        console.log("Service - Insert ", novoLivro);
        return novoLivro;
    }

    async listarLivroPorId(livroData: any): Promise<LivroEntity[]> {
        const id: number = livroData;
        const livro = await this.livroRepository.filterById(livroData);
        if (livro.length === 0) {
            throw new Error("Livro não econtrado");
        }
        console.log("Service - Filter ID ", livro);
        return livro;
    }

    async listarLivroPorTitulo(livroData: any): Promise<LivroEntity[]> {
        const titulo: string = livroData;
        const livro = await this.livroRepository.filterByTitulo(livroData);
        if (livro.length === 0) {
            throw new Error("Livro não econtrado");
        }
        console.log("Service - Filter Name ", livro);
        return livro;
    }

    async listarLivroPorAutor(livroData: any): Promise<LivroEntity[]> {
        const autor: string = livroData;
        const livros = await this.livroRepository.filterByAutor(livroData);
        if (livros.length === 0) {
            throw new Error("Livros não econtrado");
        }
        console.log("Service - Filter All ", livros);
        return livros;
    }

    async listarLivros(): Promise<LivroEntity[]> {
        const livros = this.livroRepository.getAll();
        console.log("Service - Filter All ", livros);
        return livros;
    }

    async atualizarLivro(livroData: any): Promise<LivroEntity> {
        const { id, titulo, autor, categoriaId } = livroData;
        const verificar = await this.listarLivroPorId(id);
        if (!verificar) {
            throw new Error("Livro não localizado");
        }
        const livro = new LivroEntity(id, titulo, autor, categoriaId);
        await this.livroRepository.updateLivro(livroData);
        console.log("Service - Update ", livro);
        return livro;
    }

    async deletarLivro(livroData: any): Promise<LivroEntity> {
        const { id, titulo, autor, categoriaId } = livroData;
        const usuario = new LivroEntity(id, titulo, autor, categoriaId);
        const verificarLivro = await this.listarLivroPorId(id);
        if (verificarLivro.length === 0) {
            throw new Error("Livro não encontrado");

        }
        await this.livroRepository.deleteLivro(livroData);
        console.log("Service - Delete ", usuario);
        return usuario;
    }
}
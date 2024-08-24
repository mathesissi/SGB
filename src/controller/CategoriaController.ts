import { CategoriaService } from "../service/CategoriaService";
import { CategoriaEntity } from "../model/entity/CategoriaEntity";
import { CategoriaDto } from "../model/dto/CategoriaDto";
import { CategoriaRequestDto } from "../model/dto/CategoriaRequestDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";

@Route("categoria")
@Tags("Categoria")

export class CategoriaController extends Controller {
    categoriaService = new CategoriaService();

    @Post()
    async cadastrarCategoria(
        @Body() dto: CategoriaRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const categoria = await this.categoriaService.criarCategoria(dto);
            return sucess(201, new BasicResponseDto("Categoria criada com sucesso!", categoria));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Put()
    async atualizarCategoria(
        @Body() dto: CategoriaDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const categoria = await this.categoriaService.atualizarCategoria(dto);
            return sucess(200, new BasicResponseDto("categoria atualizada com sucesso!", categoria))
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete()
    async deletarCategoria(
        @Body() dto: CategoriaDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const categoria = await this.categoriaService.deletarCategoria(dto);
            return success(200, new BasicResponseDto("Categoria deletada com sucesso!", categoria));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("id/{id}")
    async filtrarPorId(
        @Path() id: number,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const categoria = await this.categoriaService.listarCategoriaPorId(id);
            return success(200, new BasicResponseDto("Categoria encontrada com sucesso!", categoria));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("nome")
    async filtrarPorNome(
        @Query() nome: string,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const categoria: CategoriaEntity[] = await this.categoriaService.listarCategoriaPorNome(nome);
            return success(200, new BasicResponseDto("Categoria encontrada com sucesso!", categoria));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("all")
    async listarCategorias(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const categorias: CategoriaEntity[] = await this.categoriaService.listarCategorias();
            return success(200, new BasicResponseDto("Categorias listadas com sucesso!", categorias));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}

import { EmprestimoService } from "../service/EmprestimoService";
import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";
import { EmprestimoDto } from "../model/dto/EmprestimoDto";
import { EmprestimoRequestDto } from "../model/dto/EmprestimoRequestDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";

@Route("emprestimo")
@Tags("Emprestimo")

export class EmprestimoController extends Controller {
    emprestimoService = new EmprestimoService();

    @Post()
    async cadastrarEmprestimo(
        @Body() dto: EmprestimoRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const emprestimo = await this.emprestimoService.criarEmprestimo(dto);
            return sucess(201, new BasicResponseDto("Emprestimo criado com sucesso!", emprestimo));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Put()
    async atualizarEmprestimo(
        @Body() dto: EmprestimoDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const emprestimo = await this.emprestimoService.atualizarEmprestimo(dto);
            return sucess(200, new BasicResponseDto("emprestimo atualizado com sucesso!", emprestimo))
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete()
    async deletarEmprestimo(
        @Body() dto: EmprestimoDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const emprestimo = await this.emprestimoService.deletarEmprestimo(dto);
            return success(200, new BasicResponseDto("Emprestimo deletado com sucesso!", emprestimo));
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
            const emprestimo: EmprestimoEntity[] = await this.emprestimoService.listarEmprestimo(id);
            return success(200, new BasicResponseDto("Emprestimo encontrada com sucesso!", emprestimo));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("all")
    async listarEmprestimos(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const emprestimos: EmprestimoEntity[] = await this.emprestimoService.listarEmprestimos();
            return success(200, new BasicResponseDto("Emprestimos listados com sucesso!", emprestimos));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}

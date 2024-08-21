import { PessoaService } from "../service/PessoaService";
import { PessoaEntity } from "../model/entity/PessoaEntity";
import { PessoaDto } from "../model/dto/PessoaDto";
import { PessoaRequestDto } from "../model/dto/PessoaRequestDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";

@Route("pessoa")
@Tags("Pessoa")

export class PessoaController extends Controller {
    pessoaService = new PessoaService();

    @Post()
    async cadastrarPessoa(
        @Body() dto: PessoaRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const pessoa = await this.pessoaService.criarPessoa(dto);
            return sucess(201, new BasicResponseDto("Pessoa criada com sucesso!", pessoa));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Put()
    async atualizarPessoa(
        @Body() dto: PessoaDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const pessoa = await this.pessoaService.atualizarEmail(dto);
            return sucess(200, new BasicResponseDto("Email atualizado com sucesso!", pessoa))
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete()
    async deletarPessoa(
        @Body() dto: PessoaDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const pessoa = await this.pessoaService.deletarPessoa(dto);
            return success(200, new BasicResponseDto("Pessoa deletada com sucesso!", pessoa));
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
            const pessoa = await this.pessoaService.listarPessoaPorId(id);
            return success(200, new BasicResponseDto("Pessoa encontrada com sucesso!", pessoa));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("email")
    async filtrarPorEmail(
        @Query() email: string,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const pessoas: PessoaEntity = await this.pessoaService.listarPessoaPorEmail(email);
            return success(200, new BasicResponseDto("Pessoa encontrada com sucesso!", pessoas));
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
            const pessoa: PessoaEntity = await this.pessoaService.listarPessoaPorNome(nome);
            return success(200, new BasicResponseDto("Pessoa encontrada com sucesso!", pessoa));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("all")
    async listarPessoas(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const pessoas: PessoaEntity[] = await this.pessoaService.listarPessoas();
            return success(200, new BasicResponseDto("Pessoas listadas com sucesso!", pessoas));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}

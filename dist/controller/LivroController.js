"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroController = void 0;
const LivroService_1 = require("../service/LivroService");
const LivroDto_1 = require("../model/dto/LivroDto");
const LivroRequestDto_1 = require("../model/dto/LivroRequestDto");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const tsoa_1 = require("tsoa");
let LivroController = class LivroController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.livroService = new LivroService_1.LivroService();
    }
    cadastrarLivro(dto, fail, sucess) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const livro = yield this.livroService.criarLivro(dto);
                return sucess(201, new BasicResponseDto_1.BasicResponseDto("Livro criado com sucesso!", livro));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    atualizarLivro(dto, notFound, sucess) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const livro = yield this.livroService.atualizarLivro(dto);
                return sucess(200, new BasicResponseDto_1.BasicResponseDto("livro atualizado com sucesso!", livro));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    deletarLivro(dto, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const livro = yield this.livroService.deletarLivro(dto);
                return success(200, new BasicResponseDto_1.BasicResponseDto("Livro deletado com sucesso!", livro));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    filtrarPorId(id, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const livro = yield this.livroService.listarLivroPorId(id);
                return success(200, new BasicResponseDto_1.BasicResponseDto("Livro encontrada com sucesso!", livro));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    filtrarPorNome(nome, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const livro = yield this.livroService.listarLivroPorTitulo(nome);
                return success(200, new BasicResponseDto_1.BasicResponseDto("Livro encontrada com sucesso!", livro));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    filtrarPorAuotor(autor, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const livros = yield this.livroService.listarLivroPorAutor(autor);
                return success(200, new BasicResponseDto_1.BasicResponseDto("Livros encontrados com sucesso!", livros));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    listarLivros(notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const livros = yield this.livroService.listarLivros();
                return success(200, new BasicResponseDto_1.BasicResponseDto("Livros listados com sucesso!", livros));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
};
exports.LivroController = LivroController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LivroRequestDto_1.LivroRequestDto, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "cadastrarLivro", null);
__decorate([
    (0, tsoa_1.Put)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LivroDto_1.LivroDto, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "atualizarLivro", null);
__decorate([
    (0, tsoa_1.Delete)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LivroDto_1.LivroDto, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "deletarLivro", null);
__decorate([
    (0, tsoa_1.Get)("id/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "filtrarPorId", null);
__decorate([
    (0, tsoa_1.Get)("nome"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "filtrarPorNome", null);
__decorate([
    (0, tsoa_1.Get)("autor"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "filtrarPorAuotor", null);
__decorate([
    (0, tsoa_1.Get)("all"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "listarLivros", null);
exports.LivroController = LivroController = __decorate([
    (0, tsoa_1.Route)("livro"),
    (0, tsoa_1.Tags)("Livro")
], LivroController);

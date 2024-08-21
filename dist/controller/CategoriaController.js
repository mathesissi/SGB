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
exports.CategoriaController = void 0;
const CategoriaService_1 = require("../service/CategoriaService");
const CategoriaDto_1 = require("../model/dto/CategoriaDto");
const CategoriaRequestDto_1 = require("../model/dto/CategoriaRequestDto");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const tsoa_1 = require("tsoa");
let CategoriaController = class CategoriaController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.categoriaService = new CategoriaService_1.CategoriaService();
    }
    cadastrarCategoria(dto, fail, sucess) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoria = yield this.categoriaService.criarCategoria(dto);
                return sucess(201, new BasicResponseDto_1.BasicResponseDto("Categoria criada com sucesso!", categoria));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    atualizarCategoria(dto, notFound, sucess) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoria = yield this.categoriaService.atualizarCategoria(dto);
                return sucess(200, new BasicResponseDto_1.BasicResponseDto("categoria atualizada com sucesso!", categoria));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    deletarCategoria(dto, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoria = yield this.categoriaService.deletarCategoria(dto);
                return success(200, new BasicResponseDto_1.BasicResponseDto("Categoria deletada com sucesso!", categoria));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    filtrarPorId(id, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoria = yield this.categoriaService.listarCategoriaPorId(id);
                return success(200, new BasicResponseDto_1.BasicResponseDto("Categoria encontrada com sucesso!", categoria));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    filtrarPorNome(nome, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoria = yield this.categoriaService.listarCategoriaPorNome(nome);
                return success(200, new BasicResponseDto_1.BasicResponseDto("Categoria encontrada com sucesso!", categoria));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    listarCategorias(notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categorias = yield this.categoriaService.listarCategorias();
                return success(200, new BasicResponseDto_1.BasicResponseDto("Categorias listadas com sucesso!", categorias));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
};
exports.CategoriaController = CategoriaController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CategoriaRequestDto_1.CategoriaRequestDto, Function, Function]),
    __metadata("design:returntype", Promise)
], CategoriaController.prototype, "cadastrarCategoria", null);
__decorate([
    (0, tsoa_1.Put)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CategoriaDto_1.CategoriaDto, Function, Function]),
    __metadata("design:returntype", Promise)
], CategoriaController.prototype, "atualizarCategoria", null);
__decorate([
    (0, tsoa_1.Delete)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CategoriaDto_1.CategoriaDto, Function, Function]),
    __metadata("design:returntype", Promise)
], CategoriaController.prototype, "deletarCategoria", null);
__decorate([
    (0, tsoa_1.Get)("id/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], CategoriaController.prototype, "filtrarPorId", null);
__decorate([
    (0, tsoa_1.Get)("nome"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], CategoriaController.prototype, "filtrarPorNome", null);
__decorate([
    (0, tsoa_1.Get)("all"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], CategoriaController.prototype, "listarCategorias", null);
exports.CategoriaController = CategoriaController = __decorate([
    (0, tsoa_1.Route)("categoria"),
    (0, tsoa_1.Tags)("Categoria")
], CategoriaController);

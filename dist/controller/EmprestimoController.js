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
exports.EmprestimoController = void 0;
const EmprestimoService_1 = require("../service/EmprestimoService");
const EmprestimoDto_1 = require("../model/dto/EmprestimoDto");
const EmprestimoRequestDto_1 = require("../model/dto/EmprestimoRequestDto");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const tsoa_1 = require("tsoa");
let EmprestimoController = class EmprestimoController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.emprestimoService = new EmprestimoService_1.EmprestimoService();
    }
    cadastrarEmprestimo(dto, fail, sucess) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emprestimo = yield this.emprestimoService.criarEmprestimo(dto);
                return sucess(201, new BasicResponseDto_1.BasicResponseDto("Emprestimo criado com sucesso!", emprestimo));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    atualizarEmprestimo(dto, notFound, sucess) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emprestimo = yield this.emprestimoService.atualizarEmprestimo(dto);
                return sucess(200, new BasicResponseDto_1.BasicResponseDto("emprestimo atualizado com sucesso!", emprestimo));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    deletarEmprestimo(dto, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emprestimo = yield this.emprestimoService.deletarEmprestimo(dto);
                return success(200, new BasicResponseDto_1.BasicResponseDto("Emprestimo deletado com sucesso!", emprestimo));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    filtrarPorId(id, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emprestimo = yield this.emprestimoService.listarEmprestimo(id);
                return success(200, new BasicResponseDto_1.BasicResponseDto("Emprestimo encontrada com sucesso!", emprestimo));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    listarEmprestimos(notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emprestimos = yield this.emprestimoService.listarEmprestimos();
                return success(200, new BasicResponseDto_1.BasicResponseDto("Emprestimos listados com sucesso!", emprestimos));
            }
            catch (error) {
                return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
};
exports.EmprestimoController = EmprestimoController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EmprestimoRequestDto_1.EmprestimoRequestDto, Function, Function]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "cadastrarEmprestimo", null);
__decorate([
    (0, tsoa_1.Put)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EmprestimoDto_1.EmprestimoDto, Function, Function]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "atualizarEmprestimo", null);
__decorate([
    (0, tsoa_1.Delete)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EmprestimoDto_1.EmprestimoDto, Function, Function]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "deletarEmprestimo", null);
__decorate([
    (0, tsoa_1.Get)("id/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "filtrarPorId", null);
__decorate([
    (0, tsoa_1.Get)("all"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "listarEmprestimos", null);
exports.EmprestimoController = EmprestimoController = __decorate([
    (0, tsoa_1.Route)("emprestimo"),
    (0, tsoa_1.Tags)("Emprestimo")
], EmprestimoController);

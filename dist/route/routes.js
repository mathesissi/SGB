"use strict";
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
exports.RegisterRoutes = RegisterRoutes;
/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const UsuarioController_1 = require("./../controller/UsuarioController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const PessoaController_1 = require("./../controller/PessoaController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const LivroController_1 = require("./../controller/LivroController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const EmprestimoController_1 = require("./../controller/EmprestimoController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const CategoriaController_1 = require("./../controller/CategoriaController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "UsuarioRequestDto": {
        "dataType": "refObject",
        "properties": {
            "idPessoa": { "dataType": "double", "required": true },
            "senha": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicResponseDto": {
        "dataType": "refObject",
        "properties": {
            "message": { "dataType": "string", "required": true },
            "object": { "dataType": "any", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UsuarioDto": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "idPessoa": { "dataType": "double", "required": true },
            "senha": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PessoaRequestDto": {
        "dataType": "refObject",
        "properties": {
            "nome": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PessoaDto": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "nome": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LivroRequestDto": {
        "dataType": "refObject",
        "properties": {
            "titulo": { "dataType": "string", "required": true },
            "autor": { "dataType": "string", "required": true },
            "categoriaId": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LivroDto": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "titulo": { "dataType": "string", "required": true },
            "autor": { "dataType": "string", "required": true },
            "categoriaId": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EmprestimoRequestDto": {
        "dataType": "refObject",
        "properties": {
            "livroId": { "dataType": "double", "required": true },
            "usuarioId": { "dataType": "double", "required": true },
            "dataEmprestimo": { "dataType": "string", "required": true },
            "dataDevolucao": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EmprestimoDto": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "livroId": { "dataType": "double", "required": true },
            "usuarioId": { "dataType": "double", "required": true },
            "dataEmprestimo": { "dataType": "string", "required": true },
            "dataDevolucao": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoriaRequestDto": {
        "dataType": "refObject",
        "properties": {
            "nome": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CategoriaDto": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double", "required": true },
            "nome": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    app.post('/usuario', ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController.prototype.cadastrarUsuario)), function UsuarioController_cadastrarUsuario(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                dto: { "in": "body", "name": "dto", "required": true, "ref": "UsuarioRequestDto" },
                fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                sucess: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new UsuarioController_1.UsuarioController();
                yield templateService.apiHandler({
                    methodName: 'cadastrarUsuario',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/usuario', ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController.prototype.atualizarSenha)), function UsuarioController_atualizarSenha(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                dto: { "in": "body", "name": "dto", "required": true, "ref": "UsuarioDto" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                sucess: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new UsuarioController_1.UsuarioController();
                yield templateService.apiHandler({
                    methodName: 'atualizarSenha',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/usuario', ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController.prototype.deletarUsuario)), function UsuarioController_deletarUsuario(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                dto: { "in": "body", "name": "dto", "required": true, "ref": "UsuarioDto" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new UsuarioController_1.UsuarioController();
                yield templateService.apiHandler({
                    methodName: 'deletarUsuario',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/usuario/id/:id', ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController.prototype.filtrarPorId)), function UsuarioController_filtrarPorId(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new UsuarioController_1.UsuarioController();
                yield templateService.apiHandler({
                    methodName: 'filtrarPorId',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/usuario/all', ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(UsuarioController_1.UsuarioController.prototype.listarUsuarios)), function UsuarioController_listarUsuarios(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new UsuarioController_1.UsuarioController();
                yield templateService.apiHandler({
                    methodName: 'listarUsuarios',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/pessoa', ...((0, runtime_1.fetchMiddlewares)(PessoaController_1.PessoaController)), ...((0, runtime_1.fetchMiddlewares)(PessoaController_1.PessoaController.prototype.cadastrarPessoa)), function PessoaController_cadastrarPessoa(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                dto: { "in": "body", "name": "dto", "required": true, "ref": "PessoaRequestDto" },
                fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                sucess: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new PessoaController_1.PessoaController();
                yield templateService.apiHandler({
                    methodName: 'cadastrarPessoa',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/pessoa', ...((0, runtime_1.fetchMiddlewares)(PessoaController_1.PessoaController)), ...((0, runtime_1.fetchMiddlewares)(PessoaController_1.PessoaController.prototype.atualizarPessoa)), function PessoaController_atualizarPessoa(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                dto: { "in": "body", "name": "dto", "required": true, "ref": "PessoaDto" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                sucess: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new PessoaController_1.PessoaController();
                yield templateService.apiHandler({
                    methodName: 'atualizarPessoa',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/pessoa', ...((0, runtime_1.fetchMiddlewares)(PessoaController_1.PessoaController)), ...((0, runtime_1.fetchMiddlewares)(PessoaController_1.PessoaController.prototype.deletarPessoa)), function PessoaController_deletarPessoa(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                dto: { "in": "body", "name": "dto", "required": true, "ref": "PessoaDto" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new PessoaController_1.PessoaController();
                yield templateService.apiHandler({
                    methodName: 'deletarPessoa',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/pessoa/id/:id', ...((0, runtime_1.fetchMiddlewares)(PessoaController_1.PessoaController)), ...((0, runtime_1.fetchMiddlewares)(PessoaController_1.PessoaController.prototype.filtrarPorId)), function PessoaController_filtrarPorId(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new PessoaController_1.PessoaController();
                yield templateService.apiHandler({
                    methodName: 'filtrarPorId',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/pessoa/email', ...((0, runtime_1.fetchMiddlewares)(PessoaController_1.PessoaController)), ...((0, runtime_1.fetchMiddlewares)(PessoaController_1.PessoaController.prototype.filtrarPorEmail)), function PessoaController_filtrarPorEmail(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                email: { "in": "query", "name": "email", "required": true, "dataType": "string" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new PessoaController_1.PessoaController();
                yield templateService.apiHandler({
                    methodName: 'filtrarPorEmail',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/pessoa/nome', ...((0, runtime_1.fetchMiddlewares)(PessoaController_1.PessoaController)), ...((0, runtime_1.fetchMiddlewares)(PessoaController_1.PessoaController.prototype.filtrarPorNome)), function PessoaController_filtrarPorNome(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                nome: { "in": "query", "name": "nome", "required": true, "dataType": "string" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new PessoaController_1.PessoaController();
                yield templateService.apiHandler({
                    methodName: 'filtrarPorNome',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/pessoa/all', ...((0, runtime_1.fetchMiddlewares)(PessoaController_1.PessoaController)), ...((0, runtime_1.fetchMiddlewares)(PessoaController_1.PessoaController.prototype.listarPessoas)), function PessoaController_listarPessoas(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new PessoaController_1.PessoaController();
                yield templateService.apiHandler({
                    methodName: 'listarPessoas',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/livro', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.cadastrarLivro)), function LivroController_cadastrarLivro(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                dto: { "in": "body", "name": "dto", "required": true, "ref": "LivroRequestDto" },
                fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                sucess: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new LivroController_1.LivroController();
                yield templateService.apiHandler({
                    methodName: 'cadastrarLivro',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/livro', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.atualizarLivro)), function LivroController_atualizarLivro(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                dto: { "in": "body", "name": "dto", "required": true, "ref": "LivroDto" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                sucess: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new LivroController_1.LivroController();
                yield templateService.apiHandler({
                    methodName: 'atualizarLivro',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/livro', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.deletarLivro)), function LivroController_deletarLivro(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                dto: { "in": "body", "name": "dto", "required": true, "ref": "LivroDto" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new LivroController_1.LivroController();
                yield templateService.apiHandler({
                    methodName: 'deletarLivro',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/livro/id/:id', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.filtrarPorId)), function LivroController_filtrarPorId(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new LivroController_1.LivroController();
                yield templateService.apiHandler({
                    methodName: 'filtrarPorId',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/livro/nome', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.filtrarPorNome)), function LivroController_filtrarPorNome(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                nome: { "in": "query", "name": "nome", "required": true, "dataType": "string" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new LivroController_1.LivroController();
                yield templateService.apiHandler({
                    methodName: 'filtrarPorNome',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/livro/autor', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.filtrarPorAuotor)), function LivroController_filtrarPorAuotor(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                autor: { "in": "query", "name": "autor", "required": true, "dataType": "string" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new LivroController_1.LivroController();
                yield templateService.apiHandler({
                    methodName: 'filtrarPorAuotor',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/livro/all', ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController)), ...((0, runtime_1.fetchMiddlewares)(LivroController_1.LivroController.prototype.listarLivros)), function LivroController_listarLivros(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new LivroController_1.LivroController();
                yield templateService.apiHandler({
                    methodName: 'listarLivros',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/emprestimo', ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController)), ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController.prototype.cadastrarEmprestimo)), function EmprestimoController_cadastrarEmprestimo(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                dto: { "in": "body", "name": "dto", "required": true, "ref": "EmprestimoRequestDto" },
                fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                sucess: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new EmprestimoController_1.EmprestimoController();
                yield templateService.apiHandler({
                    methodName: 'cadastrarEmprestimo',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/emprestimo', ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController)), ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController.prototype.atualizarEmprestimo)), function EmprestimoController_atualizarEmprestimo(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                dto: { "in": "body", "name": "dto", "required": true, "ref": "EmprestimoDto" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                sucess: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new EmprestimoController_1.EmprestimoController();
                yield templateService.apiHandler({
                    methodName: 'atualizarEmprestimo',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/emprestimo', ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController)), ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController.prototype.deletarEmprestimo)), function EmprestimoController_deletarEmprestimo(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                dto: { "in": "body", "name": "dto", "required": true, "ref": "EmprestimoDto" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new EmprestimoController_1.EmprestimoController();
                yield templateService.apiHandler({
                    methodName: 'deletarEmprestimo',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/emprestimo/id/:id', ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController)), ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController.prototype.filtrarPorId)), function EmprestimoController_filtrarPorId(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new EmprestimoController_1.EmprestimoController();
                yield templateService.apiHandler({
                    methodName: 'filtrarPorId',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/emprestimo/all', ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController)), ...((0, runtime_1.fetchMiddlewares)(EmprestimoController_1.EmprestimoController.prototype.listarEmprestimos)), function EmprestimoController_listarEmprestimos(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new EmprestimoController_1.EmprestimoController();
                yield templateService.apiHandler({
                    methodName: 'listarEmprestimos',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/categoria', ...((0, runtime_1.fetchMiddlewares)(CategoriaController_1.CategoriaController)), ...((0, runtime_1.fetchMiddlewares)(CategoriaController_1.CategoriaController.prototype.cadastrarCategoria)), function CategoriaController_cadastrarCategoria(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                dto: { "in": "body", "name": "dto", "required": true, "ref": "CategoriaRequestDto" },
                fail: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                sucess: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new CategoriaController_1.CategoriaController();
                yield templateService.apiHandler({
                    methodName: 'cadastrarCategoria',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/categoria', ...((0, runtime_1.fetchMiddlewares)(CategoriaController_1.CategoriaController)), ...((0, runtime_1.fetchMiddlewares)(CategoriaController_1.CategoriaController.prototype.atualizarCategoria)), function CategoriaController_atualizarCategoria(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                dto: { "in": "body", "name": "dto", "required": true, "ref": "CategoriaDto" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                sucess: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new CategoriaController_1.CategoriaController();
                yield templateService.apiHandler({
                    methodName: 'atualizarCategoria',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/categoria', ...((0, runtime_1.fetchMiddlewares)(CategoriaController_1.CategoriaController)), ...((0, runtime_1.fetchMiddlewares)(CategoriaController_1.CategoriaController.prototype.deletarCategoria)), function CategoriaController_deletarCategoria(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                dto: { "in": "body", "name": "dto", "required": true, "ref": "CategoriaDto" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new CategoriaController_1.CategoriaController();
                yield templateService.apiHandler({
                    methodName: 'deletarCategoria',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/categoria/id/:id', ...((0, runtime_1.fetchMiddlewares)(CategoriaController_1.CategoriaController)), ...((0, runtime_1.fetchMiddlewares)(CategoriaController_1.CategoriaController.prototype.filtrarPorId)), function CategoriaController_filtrarPorId(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new CategoriaController_1.CategoriaController();
                yield templateService.apiHandler({
                    methodName: 'filtrarPorId',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/categoria/nome', ...((0, runtime_1.fetchMiddlewares)(CategoriaController_1.CategoriaController)), ...((0, runtime_1.fetchMiddlewares)(CategoriaController_1.CategoriaController.prototype.filtrarPorNome)), function CategoriaController_filtrarPorNome(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                nome: { "in": "query", "name": "nome", "required": true, "dataType": "string" },
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new CategoriaController_1.CategoriaController();
                yield templateService.apiHandler({
                    methodName: 'filtrarPorNome',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/categoria/all', ...((0, runtime_1.fetchMiddlewares)(CategoriaController_1.CategoriaController)), ...((0, runtime_1.fetchMiddlewares)(CategoriaController_1.CategoriaController.prototype.listarCategorias)), function CategoriaController_listarCategorias(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {
                notFound: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
                success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
            };
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });
                const controller = new CategoriaController_1.CategoriaController();
                yield templateService.apiHandler({
                    methodName: 'listarCategorias',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

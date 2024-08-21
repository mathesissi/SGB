import { PessoaEntity } from "../model/entity/PessoaEntity";
import { PessoaRepository } from "../repository/PessoaRepository";

export class PessoaService {
    pessoaRepository = PessoaRepository.getInstace();

    async criarPessoa(pessoaData: any): Promise<PessoaEntity> {
        const { nome, email } = pessoaData;
        if (typeof nome !== 'string' || typeof email !== 'string') {
            throw new Error("Dados incorretos, verificar se é 'string'");
        }
        if (!nome || !email) {
            throw new Error("É necesario inserir um nome e um email");
        }
        const verificarPessoa = await this.pessoaRepository.filterByName(pessoaData);

        const novaPessoa = this.pessoaRepository.insertPessoa(new PessoaEntity(undefined, nome));
        console.log("Service - Insert ", novaPessoa);
        return novaPessoa;
    }

    async listarPessoaPorId(pessoaData: any): Promise<PessoaEntity> {
        const id: number = pessoaData;
        const pessoa = await this.pessoaRepository.filterById(pessoaData);
        console.log("Service - Filter ID ");
        return pessoa;
    }

    async listarPessoaPorNome(pessoaData: any): Promise<PessoaEntity> {
        const nome: string = pessoaData;
        const pessoa = await this.pessoaRepository.filterByName(pessoaData);
        console.log("Service - Filter Nome ");
        return pessoa;
    }

    async listarPessoaPorEmail(pessoaData: any): Promise<PessoaEntity> {
        const email: string = pessoaData;
        const pessoa = await this.pessoaRepository.filterByEmail(pessoaData);
        console.log("Service - Filter Email ");
        return pessoa;
    }
    async listarPessoas(): Promise<PessoaEntity[]> {
        const pessoas = this.pessoaRepository.getAll();
        console.log("Service - Filter All ");
        return pessoas;
    }

    async atualizarEmail(pessoaData: any): Promise<PessoaEntity> {
        const { id, nome, email } = pessoaData;
        const verificar = await this.listarPessoaPorId(id);
        if (!verificar) {
            throw new Error("Pessoa não localizada");
        }
        const pessoa = new PessoaEntity(id, nome)
        await this.pessoaRepository.updateEmail(pessoaData);
        console.log("Service - Update ");
        return pessoa;
    }

    async deletarPessoa(pessoaData: any): Promise<PessoaEntity> {
        const { id, nome, email } = pessoaData;
        const pessoa = new PessoaEntity(id, nome, email)
        await this.pessoaRepository.deletePessoa(pessoaData);
        console.log("Service - Delete ");
        return pessoa;
    }
}
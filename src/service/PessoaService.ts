import { PessoaEntity } from "../model/entity/PessoaEntity";
import { PessoaRepository } from "../repository/PessoaRepository";

export class PessoaService {
    pessoaRepository = PessoaRepository.getInstace();

    async criarPessoa(pessoaData: any): Promise<PessoaEntity> {
        const { nome, email } = pessoaData;
        if (typeof nome !== 'string' || typeof email !== 'string') {
            throw new Error("Dados incorretos: Insira os dados em seus devidos formatos");
        }
        if (!nome || !email) {
            throw new Error("Dados incompletos: Verifique se todos os campos foram preechidos");
        }
        const verificarPessoa = await this.pessoaRepository.filterByName(nome);
        if (verificarPessoa.length > 0) {
            throw new Error("Essa pessoa já está cadastrada");
        }
        const novaPessoa = this.pessoaRepository.insertPessoa(new PessoaEntity(undefined, nome, email));
        console.log("Service - Insert ", novaPessoa);
        return novaPessoa;
    }

    async listarPessoaPorId(pessoaData: any): Promise<PessoaEntity[]> {
        const id: number = pessoaData;
        const pessoa = await this.pessoaRepository.filterById(pessoaData);
        if (pessoa.length === 0) {
            throw new Error("Nenhuma pessoa foi encontrada com o id fornecido");
        }
        console.log("Service - Filter ID ");
        return pessoa;
    }

    async listarPessoaPorNome(pessoaData: any): Promise<PessoaEntity[]> {
        const nome: string = pessoaData;
        const pessoa = await this.pessoaRepository.filterByName(pessoaData);
        if (pessoa.length === 0) {
            throw new Error("Nenhuma pessoa foi encontrada com o nome fornecido");
        }
        console.log("Service - Filter Nome ");
        return pessoa;
    }

    async listarPessoaPorEmail(pessoaData: any): Promise<PessoaEntity[]> {
        const email: string = pessoaData;
        const pessoa = await this.pessoaRepository.filterByEmail(pessoaData);
        if (pessoa.length === 0) {
            throw new Error("Nenhuma pessoa foi encontrada com o email fornecido");
        }
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
        const pessoa = new PessoaEntity(id, nome, email)
        await this.pessoaRepository.updateEmail(pessoaData);
        console.log("Service - Update ");
        return pessoa;
    }

    async deletarPessoa(pessoaData: any): Promise<PessoaEntity> {
        const { id, nome, email } = pessoaData;
        const pessoa = new PessoaEntity(id, nome, email)
        const verificarPessoa = await this.listarPessoaPorId(id);
        if (verificarPessoa.length === 0) {
            throw new Error("Pessoa não localizada");
        }
        await this.pessoaRepository.deletePessoa(pessoaData);
        console.log("Service - Delete ");
        return pessoa;
    }
}
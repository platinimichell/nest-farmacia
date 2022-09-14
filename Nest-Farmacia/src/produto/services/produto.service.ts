import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";


@Injectable()
export class ProdutoService {

    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>
    ) { }

    async findAll(): Promise<Produto[]> {
        return this.produtoRepository.find({
            relations: {
                categoria: true
            }
        })
    }

    async findById(id: number): Promise<Produto> {
        let produto = await this.produtoRepository.findOne({
            where: {
                id
            },
            relations: {
                categoria: true
            }
        })

        if (!produto)
            throw new HttpException('Produto não foi encontrado!', HttpStatus.NOT_FOUND)

        return produto
    }

    async findByDescricao(descricao: string): Promise<Produto[]> {
        return this.produtoRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`)

            },
            relations: {
                categoria: true
            }
        })
    }
    async findByNome(nome: string): Promise<Produto[]> {
        return this.produtoRepository.find({
            where: {
                nome: ILike(`%${nome}%`)

            },
            relations: {
                categoria: true
            }
            
        })
    }

    async create(produto: Produto): Promise<Produto> {
        return this.produtoRepository.save(produto)
    }

    async update(produto: Produto): Promise<Produto> {

        let produtoUpDate = await this.findById(produto.id)

        if (!produtoUpDate || !produto.id)
            throw new HttpException('Produto não encontrada!', HttpStatus.NOT_FOUND)

        return this.produtoRepository.save(produto)
    }

    async delete(id: number): Promise<DeleteResult> {

        let produtoDelete = await this.findById(id)

        if (!produtoDelete)
            throw new HttpException('Produto não foi encontrada!', HttpStatus.NOT_FOUND)

        return this.produtoRepository.delete(id)

    }
}
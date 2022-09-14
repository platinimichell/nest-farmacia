import { IsNotEmpty, MaxLength } from "class-validator";
import { Produto } from "src/produto/entities/produto.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tb_categoria'})
export class Categoria{
    
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(50)
    @Column({nullable: false, length: 50})
    nome: string

    @IsNotEmpty()
    @MaxLength(500)
    @Column({nullable: false, length: 500})
    descricao: string


    @OneToMany(() => Produto, (produto) => produto.categoria,{
        onDelete: "CASCADE"
    })
    produto: Produto

}
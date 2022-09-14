import { IsNotEmpty, MaxLength } from "class-validator";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tb_produto'})
export class Produto{
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

    @Column()
    quantidade: number

    @IsNotEmpty()
    @MaxLength(500)
    @Column({nullable: false, length: 255})
    laboratorio: string

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    preco: number

    @Column()
    foto: string

    @ManyToOne(() => Categoria, (categoria) => categoria.produto,{
        onDelete: "CASCADE"
    })
    categoria: Categoria

}
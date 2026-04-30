import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "./categoria";

@Entity()
export class Produto {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    nome?: string;
    @Column("decimal")
    preco?: number;
    @ManyToOne(()=>Categoria)
    categoria?: Categoria;
}
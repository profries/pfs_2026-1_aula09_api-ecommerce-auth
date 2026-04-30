import { Client } from "pg";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./cliente";
import { Produto } from "./produto";

@Entity()
export class Pedido {
    @PrimaryGeneratedColumn("uuid")
    id?: string;
    @Column("timestamp")
    dataHora?: Date;
    @ManyToOne(()=> Cliente)    
    cliente?: Cliente;
    @ManyToMany(()=> Produto)
    @JoinTable()
    listaProdutos?: Produto[];
}
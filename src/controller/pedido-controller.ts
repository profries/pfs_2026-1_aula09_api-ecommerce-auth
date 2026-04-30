import { Request, Response } from "express";
import { PedidoService } from "../service/pedido-service";

export class PedidoController {
    
    constructor(private service: PedidoService) {}

    inserir = async (req: Request, res: Response): Promise<void> => {
        const {cliente, listaProdutos} = req.body;
        try{ 
            const novoPedido = await this.service.inserir({cliente, listaProdutos})
            res.status(201).json(novoPedido);
        } catch (err: any){
            res.status(err.id).json({ error: err.msg});
        }
    }

    listar = async (_req: Request, res: Response): Promise<void> => {
        const pedidos = await this.service.listar();
        res.json(pedidos);
    }

    buscarPorId = async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id;
        try{
            const pedido = await this.service.buscarPorId(id as string);
            res.json(pedido);
        }
        catch (err: any){
            res.status(err.id).json({ error: err.msg});
        }
    }

}
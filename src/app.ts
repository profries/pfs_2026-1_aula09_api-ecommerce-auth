import express, { Request, Response } from 'express';
import { produtoRotas } from './router/produto-router';
import { ProdutoController } from './controller/produto-controller';
import { ProdutoService } from './service/produto-service';
import { ProdutoRepositoryMem } from './repository/produto-repository-mem';
import { AppDataSource } from './data-source';
import { Produto } from './entity/produto';
import { Pedido } from './entity/pedido';
import { PedidoService } from './service/pedido-service';
import { PedidoController } from './controller/pedido-controller';
import { pedidoRotas } from './router/pedido-router';
import { Usuario } from './entity/usuario';
import { UsuarioService } from './service/usuario-service';
import { UsuarioController } from './controller/usuario-controller';
import { usuarioRotas } from './router/usuario-router';
import { LoginService } from './service/login-service';
import { LoginController } from './controller/login-controller';
import { TokenMiddleware } from './middleware/token-middleware';

const app = express();
const port = 3000;
app.use(express.json());

// establish database connection
AppDataSource.initialize().then(async => {

    app.get('/hello', (req: Request, res: Response) => {
        res.json({ message: "Hello World!!" });
    })

    app.use('/uploads', express.static('my-uploads'))


    //Produtos
    const produtoRepository = AppDataSource.getRepository(Produto);
    const produtoService = new ProdutoService(produtoRepository);
    const produtoController = new ProdutoController(produtoService);

    //Pedidos
    const pedidoRepository = AppDataSource.getRepository(Pedido);
    const pedidoService = new PedidoService(pedidoRepository);
    const pedidoController = new PedidoController(pedidoService);

    //Usuario
    const usuarioRepository = AppDataSource.getRepository(Usuario);
    const usuarioService = new UsuarioService(usuarioRepository);
    const usuarioController = new UsuarioController(usuarioService);
    app.use('/api/usuarios', usuarioRotas(usuarioController));

    //Login
    const loginService = new LoginService(usuarioRepository);
    const loginController = new LoginController(loginService);
    app.post('/api/login', loginController.realizaLogin);

    //Middleware 
    const tokenMiddleware = new TokenMiddleware(loginService);
    app.use(tokenMiddleware.verificarAcesso);

    //Aplicando Middleware para as rotas
    app.use('/api/produtos', produtoRotas(produtoController))
    app.use('/api/pedidos', pedidoRotas(pedidoController));


    app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    });
});
import express, { Application} from 'express';
import cors from 'cors';
import morgan from 'morgan'

import usuariosRoutes from './routes/usuarioRoutes';
import personaRoutes from './routes/personaRoutes';

class Server{
    public app: Application;

    constructor(){
        this.app=express();
        this.config();
        this.ruotes();
        
    }
    config():void{
        this.app.set('port',process.env.PORT||4000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json({ limit: '100mb' }));
        this.app.use(express.urlencoded({ limit: '100mb', extended: true }));
    }
    ruotes():void{
        this.app.use('/',usuariosRoutes);
        this.app.use('/',personaRoutes);
    }
    star():void{
        this.app.listen(this.app.get('port'),()=>{
            console.log('server listening in port ', this.app.get('port'))
        })
    }
}

const server=new Server();
server.star();
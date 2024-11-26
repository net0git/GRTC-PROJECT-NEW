import { Router } from "express";
import certificadoController from "../controllers/certificadoController";

class CertificadoRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
         this.router.get('/api/certificado/:id_infraestructura',certificadoController.ObtnerCertificadosDeInfraestructura)
         this.router.post('/api/certificado',certificadoController.CrearCertificado)
         this.router.post('/api/certificado/asociar/infraestructura',certificadoController.AsociarCertificadoInfraestructura)
         this.router.put('/api/certificado/:id_certificado',certificadoController.ModificarCertificado)    
    }
}

const certificadoRoutes = new CertificadoRoutes
export default certificadoRoutes.router;
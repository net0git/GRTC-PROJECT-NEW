import { Router } from "express";
import personaController from '../controllers/personaController'


class PersonaRoutes{

    public router: Router;

    constructor(){
        this.router=Router();
        this.config();
        
    }
    config():void{
        //consultas para personas 
        this.router.get('/api/persona',personaController.listarPersonas)
        this.router.get('/api/persona/:id_persona',personaController.ObtenerPersona)
        this.router.get('/api/persona/:documento',personaController.ObtenerPersonaBydocumento)
        this.router.post('/api/persona',personaController.CrearPersona)
        this.router.put('/api/persona/modificar/datos/:id_persona',personaController.ModificarPersona)
        this.router.delete('/api/persona/:id_persona',personaController.EliminarPersona) 
    }


}

const personaRoutes = new PersonaRoutes
export default personaRoutes.router;
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  api_uri_marca=`${environment.urlApi}/marca`
  constructor() { }


        // this.router.post('/api/marca',marcaController.CrearMarca)
        // this.router.get('/api/marca',marcaController.listarMarcas)
        // this.router.get('/api/marca/:id_marca',marcaController.ObtenerMarca)
        // this.router.put('/api/marca/:id_marca',marcaController.ModificarMarca)

   
}

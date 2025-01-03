import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MarcaModel } from '../../../../domain/models/Marca.model';
import { ModeloModel } from '../../../../domain/models/Modelo.model';
import { VehiculoModel } from '../../../../domain/models/Vehiculo.model';
import { CrearMarcaMessageResponse } from '../../../../domain/dto/MarcaResponse.dto';
import { CrearModeloMessageResponse, ListarModelosResponse } from '../../../../domain/dto/ModeloResponse.dto';
import { Observable, throwError } from 'rxjs';

import { ValidadVehiculoForm } from '../../../validatorForm/vehiculo.validator';
import { ValidarModeloForm } from '../../../validatorForm/modelo.validator';
import { ValidarMarcaForm } from '../../../validatorForm/marca.validator';

import { ListarMarcasResponse } from '../../../../domain/dto/MarcaResponse.dto';
import { ListaVehiculosResponse } from '../../../../domain/dto/VehiculoResponse.dto';



@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  api_url_marca = `${environment.urlApi}/marca`
  api_url_modelo = `${environment.urlApi}/modelo`
  api_url_vehiculo = `${environment.urlApi}/vehiculo`
  constructor(private http: HttpClient) { }


  // this.router.post('/api/marca',marcaController.CrearMarca)
  // this.router.get('/api/marca',marcaController.listarMarcas)
  // this.router.get('/api/marca/:id_marca',marcaController.ObtenerMarca)
  // this.router.put('/api/marca/:id_marca',marcaController.ModificarMarca)
  //  this.router.get('/api/vehiculo/empresaservicio',vehiculoController.listarVehiculosEmpresasServicio)

  CrearMarca(cuerpo_marca: MarcaModel): Observable<CrearMarcaMessageResponse> {
    const erroresValidacion = ValidarMarcaForm(cuerpo_marca);
      if (erroresValidacion.length > 0) {
        let errorMensaje = '';
        erroresValidacion.forEach(error => {
          errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje}`;
        });
        return throwError(() => errorMensaje);
      }
    cuerpo_marca.nombre_marca = cuerpo_marca.nombre_marca.trim().toUpperCase();
    return this.http.post<CrearMarcaMessageResponse>(this.api_url_marca, cuerpo_marca);
  }

  CrearModelo(cuerpo_modelo: ModeloModel):Observable<CrearModeloMessageResponse> {
    const erroresValidacion = ValidarModeloForm(cuerpo_modelo);
      if (erroresValidacion.length > 0) {
        let errorMensaje = '';
        erroresValidacion.forEach(error => {
          errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje}`;
        });
        return throwError(() => errorMensaje);
      }
    cuerpo_modelo.nombre_modelo = cuerpo_modelo.nombre_modelo.trim().toUpperCase();
    return this.http.post<CrearModeloMessageResponse>(this.api_url_modelo, cuerpo_modelo);
  }

  CrearVehiculo(cuerpo_vehiculo: VehiculoModel) {
    const erroresValidacion = ValidadVehiculoForm(cuerpo_vehiculo);
      if (erroresValidacion.length > 0) {
        let errorMensaje = '';
        erroresValidacion.forEach(error => {
          errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje}`;
        });
        return throwError(() => errorMensaje);
      }
      cuerpo_vehiculo.placa = cuerpo_vehiculo.placa.trim().toUpperCase();
      cuerpo_vehiculo.nro_part_reg = cuerpo_vehiculo.nro_part_reg.trim();
      cuerpo_vehiculo.anio_fabricacion = cuerpo_vehiculo.anio_fabricacion.trim();
      cuerpo_vehiculo.modelo = cuerpo_vehiculo.modelo.trim();
      cuerpo_vehiculo.marca = cuerpo_vehiculo.marca.trim();
      cuerpo_vehiculo.color = cuerpo_vehiculo.color.trim();
      cuerpo_vehiculo.modalidad = cuerpo_vehiculo.modalidad.trim().toUpperCase();
      cuerpo_vehiculo.estado = cuerpo_vehiculo.estado.trim().toUpperCase();
      cuerpo_vehiculo.categoria = cuerpo_vehiculo.categoria.trim().toLocaleUpperCase();
      cuerpo_vehiculo.nro_chasis = cuerpo_vehiculo.nro_chasis.trim().toLocaleUpperCase();
      cuerpo_vehiculo.nro_asientos = cuerpo_vehiculo.nro_asientos.trim();
      cuerpo_vehiculo.serie = cuerpo_vehiculo.serie.trim().toLocaleUpperCase();
      cuerpo_vehiculo.carroceria = cuerpo_vehiculo.carroceria.trim().toLocaleUpperCase();
      
    return this.http.post(this.api_url_vehiculo, cuerpo_vehiculo);
  }

  ObeterVehiculosPorEmpresaServicio(id_empresa_servicio: number):Observable<ListaVehiculosResponse[]> {
    return this.http.get<ListaVehiculosResponse[]>(this.api_url_vehiculo + '/empresaservicio/' + id_empresa_servicio);
  }

  ObternerVehiculo(id_vehiculo: number) {
    return this.http.get(this.api_url_vehiculo + '/' + id_vehiculo);
  }

  ObtererVehiculoPorPlaca(placa: string) {
    return this.http.get(this.api_url_vehiculo + '/placa/' + placa);
  }

  ModificarVehiculo(id_vehiculo: number, vehiculo: VehiculoModel) {
    return this.http.put(this.api_url_vehiculo + '/' + id_vehiculo, vehiculo);
  }

  ListarMarcas():Observable<ListarMarcasResponse[]> {
    return this.http.get<ListarMarcasResponse[]>(this.api_url_marca);
  }

  ObtenerModelosPorMarca(id_marca: number):Observable<ListarModelosResponse[]> {
    return this.http.get<ListarModelosResponse[]>(this.api_url_modelo + '/grupo/' + id_marca);
  }


}

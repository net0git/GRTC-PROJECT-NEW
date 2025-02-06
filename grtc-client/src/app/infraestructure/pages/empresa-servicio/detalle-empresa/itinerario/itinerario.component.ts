import { Component, OnInit } from '@angular/core';
import { NavegadorComponent } from '../../../../shared/components/navegador/navegador.component';
import { SubnavegadorComponent } from '../../../../shared/components/subnavegador/subnavegador.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItinerarioService } from '../../../../services/remoto/itinerario/itinerario.service';
import { ItinerarioModel } from '../../../../../domain/models/Itinerario.model';
import { CrearItinerarioMessageResponse, EliminarItinerarioMessageResponse, ListaItinerarioResponse, ModificarItinerarioMessageResponse } from '../../../../../domain/dto/ItinerarioResponse.dto';
import { ActivatedRoute } from '@angular/router';
import { SweetAlert } from '../../../../shared/animated-messages/sweetAlert';
import { SoloLetrasDirective } from '../../../../directives/solo-letras.directive';
import { SoloLetrasGuionDirective } from '../../../../directives/solo-letras-guion.directive';
import { SoloNumerosDirective } from '../../../../directives/solo-numeros.directive';
import { ErrorValidacion } from '../../../../../domain/dto/ErrorValidacion.dto';

@Component({
  selector: 'app-itinerario',
  standalone: true,
  imports: [NavegadorComponent, SubnavegadorComponent, FormsModule, CommonModule, SoloLetrasDirective, SoloNumerosDirective, SoloLetrasGuionDirective],
  templateUrl: './itinerario.component.html',
  styleUrl: './itinerario.component.css'
})
export class ItinerarioComponent implements OnInit {

  dataItinerario:ItinerarioModel={
    id_detalle_ruta_itinerario:0,
    id_empresa_servicio:0,
    origen:'',
    destino:'',
    itinerario:'',
    frecuencia:''
  }

  listaItinerarios:ListaItinerarioResponse[]=[];
  id_empresa_servicio_temp: string = "";

  modificar: boolean = false
  constructor(private sweetAlert:SweetAlert,private itinerarioService:ItinerarioService,private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
   this.listarItinerarios()
  }

  ValidarFormulario(dataItinerario: ItinerarioModel): ErrorValidacion[] {
    const errorValidacion: ErrorValidacion[] = [];

    if (!dataItinerario.origen) {
      errorValidacion.push({ campo: 'origen', mensaje: 'Campo requerido' });
    }
    if (!dataItinerario.destino) {
      errorValidacion.push({ campo: 'destino', mensaje: 'Campo requerido' });
    }
    if (!dataItinerario.itinerario) {
      errorValidacion.push({ campo: 'itinerario', mensaje: 'Campo requerido' });
    }
    if (!dataItinerario.frecuencia) {
      errorValidacion.push({ campo: 'frecuencia', mensaje: 'Campo requerido' });
    }
    return errorValidacion;
  }

  listarItinerarios(){
    const params=this.activatedRoute.snapshot.params;
    this.id_empresa_servicio_temp = params['id_empresa_servicio'].toString();
    this.itinerarioService.listarItinerarioByEmpresasServicio(params['id_empresa_servicio']).subscribe({
      next:(data:ListaItinerarioResponse[])=>{
        this.listaItinerarios=data;
        console.log(data)
      },
      error:(err)=>{
        console.error('Error al obtener Itinerarios:', err);
      },
      complete:()=>{
        console.log('Itinerarios obtenidos correctamente'); 
      }
    });
  }

  crearItinerario(){
    const params=this.activatedRoute.snapshot.params;
    this.dataItinerario.id_empresa_servicio=params['id_empresa_servicio']
    console.log(this.dataItinerario)
    this.itinerarioService.crearItinerario(this.dataItinerario).subscribe({
      next: (res: CrearItinerarioMessageResponse) => {
        console.log(res)
      },
      error: (err) => {
        console.error('Error al obtener itinerarios:', err);
      },
      complete: () => {
        console.log('Itinerarios obtenidos correctamente');
        this.limpiar()
        this.sweetAlert.MensajeToast('Itinerario creado correctamente')
        this.listarItinerarios()
      }
    });
  }

  modificarItinerario(){
    this.itinerarioService.modificarItinerario(this.dataItinerario.id_detalle_ruta_itinerario,this.dataItinerario).subscribe({
      next: (res: ModificarItinerarioMessageResponse) => {
        console.log(res)
      },
      error: (err) => {
        console.error('Error al obtener itinerarios:', err);
      },
      complete: () => {
        console.log('Itinerarios obtenidos correctamente');
        this.limpiar()
        this.sweetAlert.MensajeToast('Itinerario modificado correctamente')
        this.listarItinerarios()
      }
    });
  }

  obtenerItinerario(itinerario: any) {

    this.dataItinerario.id_detalle_ruta_itinerario = itinerario.id_detalle_ruta_itinerario
    this.dataItinerario.id_empresa_servicio = itinerario.id_empresa_servicio
    this.dataItinerario.origen = itinerario.origen
    this.dataItinerario.destino = itinerario.destino
    this.dataItinerario.itinerario = itinerario.itinerario
    this.dataItinerario.frecuencia = itinerario.frecuencia
    this.modificar = true;

  }

  GuardarDatosFormulario() {
    const erroresValidacion = this.ValidarFormulario(this.dataItinerario);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje} \n`;
      });
      alert(errorMensaje);
      return;
    }
    if(this.modificar){
      this.modificarItinerario()
    }else{
      this.crearItinerario()
    }
  }

  eliminarItinerario(id_itinerario: number) {
    let eliminado=false
    this.itinerarioService.eliminarItinerario(id_itinerario).subscribe({
      next: (res: EliminarItinerarioMessageResponse) => {
        if (res.text !== 'error') {
          eliminado=true
        }
      },
      error: (err) => {
        console.error('Error al eliminar itinerario:', err);
      },
      complete: () => {
        if(eliminado){  
          this.limpiar()
          this.sweetAlert.MensajeToast('Itinerario eliminado correctamente')
          this.listarItinerarios()
        }else{
          this.limpiar()
          this.sweetAlert.MensajeError('No es posible eliminar un itinerario que esta activo')
        }
      }
    });
  }

  eliminarElemento(itinerario: any) {
    this.sweetAlert.MensajeConfirmacionEliminar('Esta acción no se puede deshacer.')
      .then((confirmado) => {
        if (confirmado) {
          this.eliminarItinerario(itinerario.id_detalle_ruta_itinerario)
        } else {
          console.log('Acción cancelada.');
        }
      });
  }

  limpiar() {
    this.dataItinerario.id_detalle_ruta_itinerario = 0
    this.dataItinerario.id_empresa_servicio = 0
    this.dataItinerario.origen = ""
    this.dataItinerario.destino = ""
    this.dataItinerario.itinerario = ""
    this.dataItinerario.frecuencia = ""
    this.modificar = false;
  }

}

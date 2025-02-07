import { Component, OnInit } from '@angular/core';
import { CrearMarcaMessageResponse, ListarMarcasResponse } from '../../../domain/dto/MarcaResponse.dto';
import { CrearModeloMessageResponse, ListarModelosResponse } from '../../../domain/dto/ModeloResponse.dto';
import { VehiculoService } from '../../services/remoto/vehiculo/vehiculo.service';
import { MarcaModel } from '../../../domain/models/Marca.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModeloModel } from '../../../domain/models/Modelo.model';

@Component({
  selector: 'app-registro-marca-modelo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-marca-modelo.component.html',
  styleUrl: './registro-marca-modelo.component.css'
})
export class RegistroMarcaModeloComponent implements OnInit {

  listaMarcas: ListarMarcasResponse[] = []; listaMarcasTemp: ListarMarcasResponse[] = []
  listaModelos: ListarModelosResponse[] = []
  marcaSeleccionada: string = 'sin seleccion';
  id_marca_seleccionada: number = 0;
  
  mostrarMensajeMarca:boolean = false;
  mostrarMensajeModelo:boolean = false;

  dataMarca: MarcaModel ={
    id_marca: 0,
    nombre_marca:''
  }

  dataModelo: ModeloModel ={
    id_modelo: 0,
    id_marca: 0,
    nombre_modelo:''
  }
  

  constructor(private vehiculoService: VehiculoService) { }

  ngOnInit(): void {
    console.log('RegistroMarcaModeloComponent inicializado');
    this.ListarMarcas();

  }

  CrearMarca() {
    if(this.dataMarca.nombre_marca==''){
      alert('Ingrese el nombre de la marca')
      return
    }
    if(this.buscarNombreMarca(this.dataMarca.nombre_marca)){
      alert('El nombre de la marca ya existe')
    }else{
      this.vehiculoService.CrearMarca(this.dataMarca).subscribe({
        next: (data: CrearMarcaMessageResponse) => {
          console.log(data)
        },  
        error: (error) => {
          alert(error)
        },
        complete: () => {
          console.log('creacion de marca completado')
          this.ListarMarcas()
          this.limpiarCampos()
          this.mostrarMensajeTemporalMarca()
        }
      })
    }
      
  }

  CrearModelo(){
    if (this.dataModelo.nombre_modelo==''){
      alert('Ingrese el nombre del modelo')
      return
    }  
    if (this.buscarNombreModelo(this.dataModelo.nombre_modelo)){
      alert('El nombre del modelo ya existe')
      return
    } else{
      this.dataModelo.id_marca=this.dataMarca.id_marca
      this.dataModelo.id_marca=this.id_marca_seleccionada
      this.vehiculoService.CrearModelo(this.dataModelo).subscribe({
        next: (data: CrearModeloMessageResponse) => {
          console.log(data)
        },
        error: (err) => {
          console.error('Error al crear modelo:', err);
        },
        complete: () => {
          console.log('Creacion de modelo completado');
          const dataMarcaAux: MarcaModel={
            id_marca:this.id_marca_seleccionada,
            nombre_marca:this.marcaSeleccionada
  
          }
          this.ListarModelos(dataMarcaAux)
          this.limpiarCampos()
          this.mostrarMensajeTemporalModelo()
        }
      })
    }
    

    

  }

  buscarNombreMarca(nombre_marca_temp: string): boolean {
    nombre_marca_temp = nombre_marca_temp.toUpperCase().trim()
    for (let i = 0; i < this.listaMarcasTemp.length; i++) {
      if (this.listaMarcasTemp[i].nombre_marca == nombre_marca_temp) {
        return true
      }
    }
    return false
  }

  buscarNombreModelo(nombre_modelo_temp:string):boolean{
    nombre_modelo_temp = nombre_modelo_temp.toUpperCase().trim()
    for (let i=0;i<this.listaModelos.length;i++){
      if (this.listaModelos[i].nombre_modelo==nombre_modelo_temp){
        return true
      }
    }
    return false
  }

  limpiarCampos(){

    this.dataMarca={
      id_marca:0,
      nombre_marca:'',
    };

    this.dataModelo={
      id_modelo:0,
      nombre_modelo:'', 
      id_marca:0,
    };

  }

  ListarMarcas() {
    this.vehiculoService.ListarMarcas().subscribe({
      next: (res: ListarMarcasResponse[]) => {
        this.listaMarcas = res;
        this.listaMarcasTemp = res;
        console.log(this.listaMarcas)
      },
      error: (err) => {
        console.error('Error al obtener marcas', err);
      },
      complete: () => {
        console.log('Obtención de marcas completada');
      }
    });
  }

  ListarModelos(marca: MarcaModel) {
    this.marcaSeleccionada = marca.nombre_marca;
    this.id_marca_seleccionada = marca.id_marca;
    console.log(this.dataMarca)
    this.vehiculoService.ObtenerModelosPorMarca(marca.id_marca).subscribe({
      next: (res: ListarModelosResponse[]) => {
        this.listaModelos = res;
        console.log(this.listaMarcas)
      },
      error: (err) => {
        console.error('Error al obtener modelos', err);
        this.listaModelos=[]
      },
      complete: () => {
        console.log('Obtención de modelos completada');
      }
    });
  }

  buscarEnObjeto(event: any) {
  
      const textoBusqueda = event.target.value.toLowerCase();
      this.listaMarcas = this.listaMarcasTemp.filter((objeto: ListarMarcasResponse) => {
        const marca = objeto.nombre_marca ? objeto.nombre_marca.toLowerCase() : '';
        return marca.includes(textoBusqueda)
      });
    }

  mostrarMensajeTemporalMarca(){
    this.mostrarMensajeMarca=true
    setTimeout(() => {
      this.mostrarMensajeMarca = false;
    }, 2000);
  }

  mostrarMensajeTemporalModelo(){
    this.mostrarMensajeModelo=true
    setTimeout(() => {
      this.mostrarMensajeModelo = false;
    }, 2000);
  }


}

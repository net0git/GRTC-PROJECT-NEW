import { Pool, PoolConfig } from 'pg'; //importamos la libreria de postgres 
import key from '../database/key'  //importamos los registros de nuestra conexion

// Configura la conexión a la base de datos con los parametros establecidos en key
const dbConfig: PoolConfig = key.databaseParameters;

const pool = new Pool(dbConfig);

pool.connect((error)=>{
    if(error){
        console.log('el error de conexion a la base de datos es: '+error);
        return;    
    }
    console.log('¡conexion con exito a la base de datos!')
})

export default pool;
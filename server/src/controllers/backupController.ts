import { Request, Response } from 'express';
import key from '../database/key';
import { exec } from 'child_process';
import path from 'path';
import os from 'os';


class BackupController {
    public async generarBackup(req: Request, res: Response): Promise<void> {
        const dbName = key.databaseParameters.database;
        const user = key.databaseParameters.user;
        const password = key.databaseParameters.password;
        const host = key.databaseParameters.host;
        const downloadsDir = path.join(os.homedir(), 'Downloads');
        const backupFile: string = path.join(downloadsDir, `backup_grtc_${Date.now()}.sql`);

        //console.log(backupFile);  // Para verificar la ruta generada

        process.env.PATH = process.env.PATH + ';C:\\Program Files\\PostgreSQL\\17\\bin';

        // Establecer la contraseña en el entorno
        process.env.PGPASSWORD = password;
        const pgDumpCommand = `pg_dump -h ${host} -U ${user} -d ${dbName} -F c -f "${backupFile}"`;

        // Ejecuta el comando pg_dump
        exec(pgDumpCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al generar el backup: ${error.message}`);
                return res.status(500).json({ message: 'Error al generar el backup' });
            }

            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return res.status(500).json({ message: 'Error al generar el backup' });
            }

            // Si todo va bien, responde con la ruta del archivo generado
            console.log(`Backup generado con éxito en: ${backupFile}`);
            return res.status(200).json({ message: `Backup generado exitosamente en ${backupFile}`, filePath: backupFile });
        });
    }
}
const backupController = new BackupController();
export default backupController;
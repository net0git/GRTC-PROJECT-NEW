"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const key_1 = __importDefault(require("../database/key"));
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
class BackupController {
    generarBackup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbName = key_1.default.databaseParameters.database;
            const user = key_1.default.databaseParameters.user;
            const password = key_1.default.databaseParameters.password;
            const host = key_1.default.databaseParameters.host;
            const downloadsDir = path_1.default.join(os_1.default.homedir(), 'Downloads');
            const backupFile = path_1.default.join(downloadsDir, `backup_grtc_${Date.now()}.sql`);
            //console.log(backupFile);  // Para verificar la ruta generada
            process.env.PATH = process.env.PATH + ';C:\\Program Files\\PostgreSQL\\17\\bin';
            // Establecer la contraseña en el entorno
            process.env.PGPASSWORD = password;
            const pgDumpCommand = `pg_dump -h ${host} -U ${user} -d ${dbName} -F c -f "${backupFile}"`;
            // Ejecuta el comando pg_dump
            (0, child_process_1.exec)(pgDumpCommand, (error, stdout, stderr) => {
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
        });
    }
}
const backupController = new BackupController();
exports.default = backupController;

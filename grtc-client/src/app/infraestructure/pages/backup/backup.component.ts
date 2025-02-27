import { Component } from '@angular/core';
import { NavegadorComponent } from '../../shared/components/navegador/navegador.component'
import { BackupService } from '../../services/remoto/backup/backup.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-backup',
  standalone: true,
  imports: [NavegadorComponent, CommonModule],
  templateUrl: './backup.component.html',
  styleUrl: './backup.component.css'
})
export class BackupComponent {

  isDownloading = false;
  downloadMessage = '';

  constructor(private backupService: BackupService) { }

  descargarBackup() {
    this.isDownloading = true;
    this.downloadMessage='',
    this.backupService.generarBackup().subscribe(
      (response) => {
        this.isDownloading = false;
        this.downloadMessage = response.message;
        const filePath = response.filePath;

        // Si quieres forzar la descarga, puedes hacer algo como esto:
        window.location.href = filePath;

        // O mostrar un mensaje al usuario
       // alert('Backup generado exitosamente. ¡Ya puedes descargarlo!');
      },
      (error) => {
        this.isDownloading = false;
        this.downloadMessage = 'Error al generar el backup.';
        console.error(error);
      }
    );
    // this.backupService.generarBackup().subscribe((data) => {
    //   const blob = new Blob([data], { type: 'application/octet-stream' });
    //   const url = window.URL.createObjectURL(blob);
    //   const a = document.createElement('a');
    //   a.href = url;
    //   a.download = 'backup.sql';
    //   a.click();
    //   window.URL.revokeObjectURL(url);
    // });
  }
}

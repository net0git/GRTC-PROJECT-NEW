import { Component } from '@angular/core';
import { NavegadorComponent } from '../../shared/components/navegador/navegador.component'

@Component({
  selector: 'app-backup',
  standalone: true,
  imports: [NavegadorComponent],
  templateUrl: './backup.component.html',
  styleUrl: './backup.component.css'
})
export class BackupComponent {

}

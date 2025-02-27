import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackupService {

  private apiUrl = `${environment.urlApi}/backup`;

  constructor(private http: HttpClient) { }

  generarBackup(): Observable<any> {
    return this.http.post<any>(this.apiUrl,{});
  }
}

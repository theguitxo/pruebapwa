import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import * as versionData from '../../public/assets/config.json';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  httpClient!: HttpClient;

  showUpdateButton = false;
  currentVersion!: string;

  constructor() {
    this.httpClient = inject(HttpClient);
  }

  ngOnInit(): void {
    this.currentVersion = versionData.version;

    const headers = new HttpHeaders().set('Cache-Control', 'no-cache').set('Pragma', 'no-cache');

    this.httpClient.get<{ version: string }>('./assets/config.json', { headers })
      .subscribe(config => {
        console.log(config);

        this.showUpdateButton =config.version !== this.currentVersion;
      });
  }

  update(): void {
    location.reload();
  }
}

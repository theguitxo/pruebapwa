import { Component, inject } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showUpdateButton = false;

  swUpdate!: SwUpdate;
  updateSubscription!: Subscription;

  constructor() {
    this.swUpdate = inject(SwUpdate);
  }

  update(): void {
    location.reload();
  }

  checkUpdate(): void {
    this.swUpdate
      .checkForUpdate()
      .then((value) => (this.showUpdateButton = value));
  }
}

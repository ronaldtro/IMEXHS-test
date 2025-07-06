import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SuccessAlertComponent } from './components/success-alert/success-alert.component';
import { WarningAlertComponent } from './components/warning-alert/warning-alert.component';
import { DangerAlertComponent } from './components/danger-alert/danger-alert.component';
import { AlertService } from './services/alert.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SuccessAlertComponent, WarningAlertComponent, DangerAlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  activeAlert: {
    state: boolean,
    type: string
  };

  alertSubs: any;

  constructor(private alertService: AlertService) {
    this.activeAlert = {
      state: false,
      type: ""
    };

  }

  ngOnInit(): void {
    this.alertSubs = this.alertService.getAlertSubject().subscribe((data: any) => {
      this.activeAlert.state = data.state
      this.activeAlert.type = data.type
    });
  }

  ngOnDestroy(): void {
    if (this.alertSubs) {
      this.alertSubs.unsubscribe();
    }
  }

}

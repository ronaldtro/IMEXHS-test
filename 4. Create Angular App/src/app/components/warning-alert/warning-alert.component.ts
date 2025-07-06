import { Component } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'WarningAlert',
  standalone: true,
  imports: [],
  templateUrl: './warning-alert.component.html',
  styleUrl: './warning-alert.component.css'
})
export class WarningAlertComponent {

  data: any;
  warningAlertSubs: any;

  constructor(private alertService: AlertService) {

  }

  ngOnInit(): void {

    this.warningAlertSubs = this.alertService.getAlertSubject().subscribe(resp => {
      this.data = resp;
    });

    setTimeout(() => {
      this.alertService.setStateAlertSubject(false);
    }, 3000);
  }

  ngOnDestroy(): void {
    this.warningAlertSubs.unsubscribe();
  }

}

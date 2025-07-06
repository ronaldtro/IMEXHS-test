import { Component } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'DangerAlert',
  standalone: true,
  imports: [],
  templateUrl: './danger-alert.component.html',
  styleUrl: './danger-alert.component.css'
})
export class DangerAlertComponent {

  data: any;
  dangerAlertSubs: any;

  constructor(private alertService:AlertService) {
  }

  ngOnInit(): void {

    this.dangerAlertSubs = this.alertService.getAlertSubject().subscribe(resp => {
      this.data = resp;
    });

    setTimeout(() => {
      this.alertService.setStateAlertSubject(false);
    }, 3000);
  }

  ngOnDestroy(): void {
    this.dangerAlertSubs.unsubscribe();
  }

}

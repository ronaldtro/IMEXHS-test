import { Component } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'SuccessAlert',
  standalone: true,
  imports: [],
  templateUrl: './success-alert.component.html',
  styleUrl: './success-alert.component.css'
})
export class SuccessAlertComponent {

  data: any;
  successAlertSubs: any;

  constructor(private alertService:AlertService) {

  }

  ngOnInit(): void {

    this.successAlertSubs = this.alertService.getAlertSubject().subscribe(resp => {
      this.data = resp;
    });

    setTimeout(() => {
      this.alertService.setStateAlertSubject(false);
    }, 3000);
  }

  ngOnDestroy(): void {
    this.successAlertSubs.unsubscribe();
  }

}

import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';
import { HistoryService } from '../../services/history.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent implements OnInit {

  form: FormGroup;
  imageSrc: string|ArrayBuffer|null;
  imageData: ImageData|null;
  estimatedArea: number|null;
  waiting: boolean;

  constructor(private alertService: AlertService, private historyService: HistoryService,
    private fb: FormBuilder, private imageService: ImageService) {

    this.form = this.fb.group({
      imageFile: [null, [Validators.required]],
      pointsCount: [100, [Validators.required]]
    });
    this.imageSrc = "";
    this.imageData = null;
    this.estimatedArea = null;
    this.waiting = false;
  }

  ngOnInit(): void {
  }

  async submit() {

    this.form.get('imageFile')?.markAsTouched();
    this.form.get('pointsCount')?.markAsTouched();

    if (this.form.get('imageFile')?.invalid || this.form.get('pointsCount')?.invalid) {

      this.alertService.setMessageAlertSubject("Invalid data or missing.");
      this.alertService.setTypeAlertSubject("warning");
      this.alertService.setStateAlertSubject(true);

    } else {

      Swal.fire({
        title: '¿Confirm action?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#000000',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {

          this.waiting = true;
          setTimeout(() => {

            if (this.imageData) {
              const area = this.imageService.estimateArea(this.imageData, this.form.value.pointsCount);
              this.estimatedArea = area;
            }

            this.historyService.addToHistory({
              area: this.estimatedArea ?? 0,
              pointsCount: this.form.value.pointsCount
            })

            this.alertService.setMessageAlertSubject("Success action.");
            this.alertService.setTypeAlertSubject("success");
            this.alertService.setStateAlertSubject(true);
            this.waiting = false;

          }, 2000);
        }
      });

    }
  }

  onFileChange(event: Event): void {

    const file = (event.target as HTMLInputElement).files?.[0] || null;

    if (file) {
      this.imageService.loadImage(file).then(data => this.imageData = data);

      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);

    }

  }

}

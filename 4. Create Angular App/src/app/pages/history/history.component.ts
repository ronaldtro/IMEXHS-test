import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { History } from '../../models/History';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})

export class HistoryComponent implements OnInit{
  history: History[];

  constructor(private historyService:HistoryService){
    this.history = []
  }

  ngOnInit(): void {
    this.historyService.history$.subscribe((resp:History[]) => this.history = resp);
  }

}

import { Component, Input } from '@angular/core';
import { RatingModule } from 'primeng/rating';
import { ReviewSummary } from './types';
import { FormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-review-summary-component',
  imports: [RatingModule, FormsModule, ProgressBarModule],
  templateUrl: './review-summary-component.html',
  styleUrl: './review-summary-component.css',
})
export class ReviewSummaryComponent {
  @Input({ required: true }) reviewSummary!: ReviewSummary;
}

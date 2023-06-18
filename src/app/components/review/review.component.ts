import { Component } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { feedback } from '../models/feedback';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {

  customerTestimony: feedback[] = [];

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.feedbackService.getCustomerTestimony().subscribe((data)=>{
      this.customerTestimony = data;
      console.log(this.customerTestimony);
    });
  }

}

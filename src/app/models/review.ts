import { userReview } from './userReview';

export class review {
  reviewId: number;
  pId: number;
  totalRating: number;
  noOfRating: number;
  userReview: userReview[];

  constructor(
    $reviewId: number,
    $pId: number,
    $totalRating: number,
    $noOfRating: number,
    $userReview: userReview[]
  ) {
    this.reviewId = $reviewId;
    this.pId = $pId;
    this.totalRating = $totalRating;
    this.noOfRating = $noOfRating;
    this.userReview = $userReview;
  }
}

export class userReview {
  userId: string;
  name: string;
  img_url: string;
  userRating: number;
  dateOfReview: string;
  review: string;
  constructor(
    $userId: string,
    $name: string,
    $img_url: string,
    $userRating: number,
    $dateOfReview: string,
    $review: string
  ) {
    this.userId = $userId;
    this.name = $name;
    this.img_url = $img_url;
    this.userRating = $userRating;
    this.dateOfReview = $dateOfReview;
    this.review = $review;
  }
}

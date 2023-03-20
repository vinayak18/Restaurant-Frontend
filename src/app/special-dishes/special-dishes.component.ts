import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-special-dishes',
  templateUrl: './special-dishes.component.html',
  styleUrls: ['./special-dishes.component.css'],
})
export class SpecialDishesComponent implements OnInit {
  pageNo: number = 1;
  productPerPage: number = 3;
  @Input() homeRouteFlag: boolean;
  constructor() {}

  ngOnInit(): void {}
  dummy: any = [
    {
      name: 'Beef Steak Sauce',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, ea vero alias perferendis quas animi doloribus voluptates. Atque explicabo ea nesciunt provident libero qui eum, corporis esse quos excepturi soluta?',
      price: 15,
    },
    {
      name: 'Beef Steak Sauce',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, ea vero alias perferendis quas animi doloribus voluptates. Atque explicabo ea nesciunt provident libero qui eum, corporis esse quos excepturi soluta?',
      price: 15,
    },
    {
      name: 'Salmon Zucchini',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, ea vero alias perferendis quas animi doloribus voluptates. Atque explicabo ea nesciunt provident libero qui eum, corporis esse quos excepturi soluta?',
      price: 30,
    },
    {
      name: 'Beef Steak Sauce',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, ea vero alias perferendis quas animi doloribus voluptates. Atque explicabo ea nesciunt provident libero qui eum, corporis esse quos excepturi soluta?',
      price: 15,
    },
    {
      name: 'Beef Steak Sauce',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, ea vero alias perferendis quas animi doloribus voluptates. Atque explicabo ea nesciunt provident libero qui eum, corporis esse quos excepturi soluta?',
      price: 15,
    },
  ];
}

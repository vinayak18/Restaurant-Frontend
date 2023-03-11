import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  value = 0;
  constructor() {}

  ngOnInit(): void {}
  handleMinus() {
    this.value--;
  }
  handlePlus() {
    this.value++;
  }
}

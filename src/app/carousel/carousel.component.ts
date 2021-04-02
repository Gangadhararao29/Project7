import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  carouselimage=[
    "../../assets/bg_1.jpg",
    "../../assets/bg_2.jpg",
    "../../assets/bg_3.jpg"
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

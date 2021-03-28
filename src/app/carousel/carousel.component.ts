import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  carouselimage=[
    "../assets/farm-scene-with-red-barn-field-landscape_1308-54361.jpg",
    "../assets/hand-drawn-farming-profession_23-2148885540.jpg",
    "../assets/organic-flat-design-farming-profession-collection_23-2148887073.jpg"
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

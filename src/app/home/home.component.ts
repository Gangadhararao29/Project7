import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  carouselimage=[
    "../assets/farm-scene-with-red-barn-field-landscape_1308-54361.jpg",
    "../assets/hand-drawn-farming-profession_23-2148885540.jpg",
    "../assets/organic-flat-design-farming-profession-collection_23-2148887073.jpg"
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

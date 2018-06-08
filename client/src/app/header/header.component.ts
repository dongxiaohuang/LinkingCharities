import { Component, OnInit, HostListener } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isCollapsed = false;
  constructor() { }

  ngOnInit()
  {}

  // window scroll listener
  @HostListener("window:scroll", [])
  onWindowScroll() {
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number <= 10) {
      $('.navbar').addClass("transparent");
    } else {
      $('.navbar').removeClass("transparent")
   }}

}

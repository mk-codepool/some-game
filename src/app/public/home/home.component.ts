import { Component, OnInit } from '@angular/core';

const appsUrls: { [key: string]: string } = {
  angular: 'https://angular.io/',
  threejs: 'https://threejs.org/',
  chatgpt: 'https://openai.com/',
  ngrx: 'https://ngrx.io/',
  nestjs: 'https://nestjs.com/',
  mongodb: 'https://www.mongodb.com/'
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public animateClass!: string | null;

  constructor() { }

  ngOnInit() {
  }

  public handleExternalLibClicked(animateClass: string): void {
    this.animateClass = animateClass;

    setTimeout(() => {
      this.animateClass = null;
      window.open(appsUrls[animateClass], '_blank');
    }, 500);
  }
}

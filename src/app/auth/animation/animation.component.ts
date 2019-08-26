import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { interval, Subscriber, Observable } from 'rxjs';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css']
})
export class AnimationComponent implements OnInit, AfterViewInit, OnDestroy{
  private spawner;

  constructor(private elemtnRef: ElementRef) { }

  ngOnInit() {

    this.spawner = interval(500).subscribe(
      {
        next() {}
      }
    )
  }


  // because of the shadow DOM, can't set the background color in style.css
  ngAfterViewInit(){
    this.elemtnRef.nativeElement.ownerDocument.body.style.backgroundColor = "rgb(38, 41, 34)";
  }

  ngOnDestroy(){
    this.spawner.unsubscribe();
  }

}

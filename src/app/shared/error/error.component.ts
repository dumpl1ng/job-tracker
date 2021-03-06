import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  @Input() message: string;
  public close = false;

  constructor() { }

  ngOnInit() {
  }

  onClose(){
    this.close = true;
  }

}

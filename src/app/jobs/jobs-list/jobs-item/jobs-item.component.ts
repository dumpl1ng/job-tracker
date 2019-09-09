import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../job.model';

@Component({
  selector: 'app-jobs-item',
  templateUrl: './jobs-item.component.html',
  styleUrls: ['./jobs-item.component.css']
})
export class JobsItemComponent implements OnInit {
  @Input() job: Job;
  @Input() index: number;


  constructor() {}

  ngOnInit() {
  }


  month(monthNumber: number) {
    const months = [ 'January', 'February', 'March', 'April', 'May', 'June',
           'July', 'August', 'September', 'October', 'November', 'December' ];

    return months[monthNumber];
  }

}

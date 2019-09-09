import { Component, OnInit } from '@angular/core';
import { Job } from '../job.model';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {

  jobs = [
    new Job('test', 'Software Engineer', 'Hughes', 'offer', new Date()),
    new Job('test', 'QA Engineer', 'test', 'offer', new Date())
  ];

  constructor() { }

  ngOnInit() {
  }

}

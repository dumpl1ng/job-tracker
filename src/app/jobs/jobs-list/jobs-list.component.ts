import { Component, OnInit } from '@angular/core';
import { Job } from '../job.model';
import { JobService } from '../job.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {
  jobs = []

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.jobs = this.jobService.getJobs();
  }

}

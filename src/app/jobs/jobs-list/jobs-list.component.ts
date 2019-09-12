import { Component, OnInit, OnDestroy } from '@angular/core';
import { Job } from '../job.model';
import { JobService } from '../job.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit, OnDestroy{
  jobs: Job[] = [];
  private jobsSubscription: Subscription;

  constructor(private jobService: JobService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.jobService.setJobs();
    
    this.jobsSubscription = this.jobService.jobChanged.subscribe(
      next => {
        this.jobs = next;
      }
    )
  }

  // add new job to existing jobs
  addNewJob() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.jobsSubscription.unsubscribe();
  }

}

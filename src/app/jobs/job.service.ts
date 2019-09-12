import { Injectable, OnInit } from '@angular/core';
import { AppModule } from '../app.module';
import { Job } from './job.model';
import { JobsDataService } from './jobs-data.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private jobs: Job[] = [];
  private jobStatus = [
    'offer', 'not applied', 'declined', 'interviewing', 'no response'
  ];
  public jobChanged = new Subject<Job []>();


  constructor(private jobsDataService: JobsDataService) {
  }

  public getJobs() {
    return this.jobs.slice();
  }

  public getJob(index: number): Job {
    return this.jobs[index];
  }

  public getStatus() {
    return this.jobStatus.copyWithin(0, 0);
  }

  public setJobs() {
    this.jobsDataService.getAllJobs();
    this.jobsDataService.jobData.subscribe(
      next => {
        this.jobs = next;
        this.jobChanged.next(this.jobs);
      }
    )
  }

}

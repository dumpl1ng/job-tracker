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
    this.jobsDataService.jobData.subscribe(
      next => {
        this.jobs = next;
        this.jobChanged.next(this.jobs);
      }
    )
  }


  public setJobs(jobs: Job[]) {
    this.jobs = jobs;
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

  // get all the jobs from the data service and forward them to component
  public getJobsFromRepository(userId: string) {
    this.jobsDataService.getAllJobs(userId);
  }

  // delete a job from the current database
  public deleteJob(index: number, userId: string) {
    this.jobs.splice(index, 1);
    this.jobsDataService.deleteAllJobs(userId);
    this.jobs.forEach(element => {
      this.jobsDataService.addNewJob(element, userId);
    });
  }

  public updateJob(index: number, userId: string, updatedJob: Job) {
    this.jobs.splice(index, 1);
    this.jobs.push(updatedJob);
    this.jobsDataService.deleteAllJobs(userId);
    this.jobs.forEach(element => {
      this.jobsDataService.onlyAddNewJob(element, userId);
    });
  }
}

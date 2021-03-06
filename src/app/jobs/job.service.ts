import { Injectable, OnInit } from '@angular/core';
import { AppModule } from '../app.module';
import { Job } from './job.model';
import { JobsDataService } from './jobs-data.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { updatedJob } from './updatedJob.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private jobs: Job[] = [];
  private jobStatus = [
    'offer', 'not applied', 'declined', 'interviewing', 'no response'
  ];
  public jobChanged = new Subject<Job []>();

  // this is initialized before the job edit component, so need to save the last data to give it to job edit component
  public singleJob = new Subject<Job>();
  private index = 0;

  constructor(private jobsDataService: JobsDataService) {
    this.jobsDataService.jobData.subscribe(
      next => {
        this.jobs = next;
        this.jobChanged.next(this.jobs);

        this.singleJob.next(this.jobs[this.index]);
      }
    )
  }

  // set current job array
  public setJobs(jobs: Job[]) {
    this.jobs = jobs;
  }

  // get all jobs
  public getJobs() {
    return this.jobs.slice();
  }

  public awaitGetJob(index: number) {
    this.index = index;
    this.singleJob.next(this.jobs[this.index]);
  }

  // get job based on index
  public getJob(index: number): Job {
    return this.jobs[index];
  }

  // return all job status
  public getStatus() {
    return this.jobStatus.copyWithin(0, 0);
  }

  // get all the jobs from the data service and forward them to component
  public getJobsFromRepository(userId: string, jobStatusSortKey: string) {
    this.jobsDataService.changeStatusSortKey(jobStatusSortKey);
    this.jobsDataService.getAllJobs(userId);
  }

  // delete a job from the current database
  public deleteJob(index: number, userId: string) {
    this.jobsDataService.deleteJob(userId, this.getJob(index).jobId);
  }

  // update a job and put to database
  public updateJob(index: number, userId: string, job: Job) {
    const update = new updatedJob(job.url, job.title, job.company, job.status, job.dateApplied);
    this.jobsDataService.updateJob(update, userId, this.getJob(index).jobId);
  }

  


  
  
}

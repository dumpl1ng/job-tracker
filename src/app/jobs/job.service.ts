import { Injectable } from '@angular/core';
import { AppModule } from '../app.module';
import { Job } from './job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private jobs = [
    new Job('hughes.com', 'Software Engineer', 'Hughes', 'offer', new Date()),
    new Job('test.com', 'QA Engineer', 'test', 'declined', new Date())
  ];
  private jobStatus = [
    'offer', 'not applied', 'declined', 'interviewing', 'no response'
  ];


  constructor() { }


  public getJobs() {
    return this.jobs.copyWithin(0 , 0);
  }

  public getJob(index: number): Job {
    return this.jobs[index];
  }

  public getStatus() {
    return this.jobStatus.copyWithin(0, 0);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Job } from '../job.model';
import { JobService } from '../job.service';
import { JobsDataService } from '../jobs-data.service';

@Component({
  selector: 'app-jobs-edit',
  templateUrl: './jobs-edit.component.html',
  styleUrls: ['./jobs-edit.component.css']
})
export class JobsEditComponent implements OnInit {
  job: Job;
  id: number;
  title: string;
  company: string;
  url: string;
  date: Date;
  status: string;
  jobStatus: string[];
  isNewJob = false;
  private userId: string;

  constructor(private router: Router, private route: ActivatedRoute,
    private jobService: JobService, private jobDataService: JobsDataService) { }

  ngOnInit() {

    this.jobStatus = this.jobService.getStatus();
    this.route.params.subscribe(
      (params: Params) => {
        // tslint:disable-next-line: no-string-literal
        if (params['id'] === 'new') {
          this.isNewJob = true;
        }

        this.route.parent.params.subscribe(
          (params: Params) => {
            this.userId = params['userId'];
          }
        )

        if (!this.isNewJob) {
          this.id = +params['id'];
          this.job = this.jobService.getJob(this.id);

          this.title = this.job.title;
          this.company = this.job.company;
          this.url = this.job.url;
          this.date = this.job.dateApplied;
          this.status = this.job.status;
        }
      }
    )
  }


  onSubmit(form: NgForm) {
    if (this.isNewJob) {
      if (!form.valid){
        alert('Form is not valid');
      } else {
        this.jobDataService.addNewJob(new Job(this.url, this.title, this.company, this.status, new Date(form.value.date)), this.userId);
      }
    }
  }

}

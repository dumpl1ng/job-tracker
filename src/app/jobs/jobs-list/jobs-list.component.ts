import { Component, OnInit, OnDestroy } from '@angular/core';
import { Job } from '../job.model';
import { JobService } from '../job.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { DisplayedJob } from '../DisplayedJob.model';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit, OnDestroy{
  jobs: DisplayedJob[] = [];
  jobIndex = 0;

  private isNewJob = false;

  // for pagination
  pageOfjobs: Array<any>;
  private jobsSubscription: Subscription;

  public jobsPerPage = 10;
  private childRouteSubscription: Subscription;

  constructor(private jobService: JobService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    var userId;
    this.route.params.subscribe(
      (params: Params) => {
        userId = params['userId'];


        this.jobService.getJobsFromRepository(userId);
    
        this.jobsSubscription = this.jobService.jobChanged.subscribe(
          next => {
            for (let i = 0; i < next.length; i++){
              let tempJob = next[i];
              let displayedJob = new DisplayedJob(i, tempJob.url, tempJob.title, tempJob.company, tempJob.status, tempJob.dateApplied);

              this.jobs.push(displayedJob);
            }
          }
        )
      }
    ).unsubscribe();
    
    // get the job index from the url
    if (this.route.children != null){
      this.childRouteSubscription =  this.route.firstChild.params.subscribe(
        (params: Params) => {
          if(params['id']){
            
            if(params['id'] === 'new'){
              this.isNewJob = true;
            }else{
              this.jobIndex = +params['id'];
            }
          }
        }
      );
    }
  }

  // add new job to existing jobs
  addNewJob() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.jobsSubscription.unsubscribe();
    
    if(this.childRouteSubscription != null){
      this.childRouteSubscription.unsubscribe();
    }
  }

  onOpenJobEdit(index: number) {
    this.router.navigate([index], {relativeTo: this.route});
  }

  onChangePage(pageOfitems: Array<any>) {
    this.pageOfjobs = pageOfitems;
  }

  // get the page index from the job index
  getPageNum() {
    let pageNum = 0;
    if( !this.isNewJob ){
      pageNum = Math.ceil((this.jobIndex + 1) / this.jobsPerPage);
    }
    
    return pageNum;
  }
}
